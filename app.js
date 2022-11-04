const path = require("path");

const express = require("express");

const model = require("./util/database");
const bodyParser = require("body-parser");

const connection = model.connection;

const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "blackzat", //데이터를 암호화 하기 위해 필요한 옵션
    resave: false, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션이 실행시킴(서버 부담 줄임)
    store: new FileStore(), // 세션이 데이터를 저장하는 곳
  })
);

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.listen(3000);
