const Product = require("../model/product");
const User = require("../model/user");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "753698",
  database: "book",
});

connection.connect();

//프런트에서 서버로 데이터 보냄 fetch를 통해 전해줌
exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "shop",
    path: "/",
  });
};

exports.getLogin = (req, res, next) => {
  res.render("shop/login", {
    pageTitle: "login",
    path: "/login",
  });
};

exports.getSign = (req, res, next) => {
  res.render("shop/sign", {
    pageTitle: "sign",
    path: "/sign",
  });
};

//회원가입
exports.PostSign = (req, res) => {
  const ID = req.body.id;
  const pw = req.body.pw;
  const name = req.body.name;
  console.log(req.body);
  var sql_insert = { user_id: ID, user_pw: pw, user_name: name };
  connection.query(
    "select user_id from users where user_id=?",
    [ID],
    function (err, rows) {
      if (err) throw err;
      if (rows.length) {
        res.json({ result: "fail" });
      } else {
        connection.query(
          "insert into users set?",
          sql_insert,
          function (err, rows) {
            if (err) throw err;
            console.log("ok");
            res.json({ result: "ok" });
          }
        );
      }
    }
  );
};
