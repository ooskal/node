const Product = require("../model/product");
const User = require("../model/user");
const mysql = require("mysql2");
const { ConnectionTimedOutError } = require("sequelize");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "753698",
  database: "book",
});

connection.connect();
//render에 파일경로 넣

exports.getBooks = (req, res, next) => {
  connection.query("select * from books", (err, result) => {
    res.render("shop/books", { bookList: result });
  });
};

exports.getIndex = (req, res, next) => {
  //res.render("shop/index", {
  //  pageTitle: "shop",
  //  path: "/",
  //});
  // 세션이 로그인이면 히든출력, 아니면 index 출력
  // if (req.session.isLogined) {
  //   res.render("shop/hidden");
  // } else {
  //   res.render("shop/index");
  // }

  console.log("in");
  connection.query("select * from books", function (err, rows) {
    if (err) throw err;
    if (!err) {
      console.log(rows);
      var title1 = rows.title;
      var price1 = rows.price;
      res.render("shop/index", {
        pageTitle: "shop",
        title: title1,
        price: price1,
      });
    } else console.log("error while performing Query", err);
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
