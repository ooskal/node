const Product = require("../model/product");
const User = require("../model/user");
const mysql = require("mysql2");
const { ConnectionTimedOutError } = require("sequelize");
const { off } = require("../util/database");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "753698",
  database: "book",
});

connection.connect();
//render에 파일경로 넣

//검색기능
exports.postIndex = (req, res, next) => {
  const book = req.body.title;

  connection.query(
    "select * from books where title = ?",
    [book],
    (err, result) => {
      res.render("shop/index", { book: result });
    }
  );
};

exports.getBookDetail = (req, res, next) => {
  const book_num = req.params.productId;
  console.log(book_num);

  connection.query(
    "select * from books where book_num = ?",
    [book_num],
    (err, result) => {
      res.render("shop/book-detail", { product: result[0] });
    }
  );

  console.log(book_num);
};

//책 출력
exports.getBooks = (req, res, next) => {
  connection.query("select * from books", (err, result) => {
    res.render("shop/books", { bookList: result });
  });
};

//메인화면
exports.getIndex = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.render("shop/index", { isLoggedIn: false, userMessage: "로그인해라" });
  } else {
    const username = req.session.name;

    res.render("shop/index", {
      isLoggedIn: true,
      userMessage: `${username}님 환영♡`,
    });
  }

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

//로그아웃
exports.getLogout = (req, res) => {
  console.log("로그아웃 성공");
  req.session.destory(function (err) {
    res.redirect("/");
  });
};

exports.getLogin = (req, res, next) => {
  res.render("shop/login", {
    pageTitle: "login",
    path: "/login",
  });
};

exports.postLogin = (req, res) => {
  console.log("로그인 중");
  let body = req.body; //웹에서 가져오는 데이터임
  //views에 있는 name 입력
  connection.query(
    "select * from users where user_id=?",
    [body.id],
    //result 가 데이터베이스에서 가져오는 데이터임
    (err, result) => {
      if (err) throw err;
      if (body.id === result[0].user_id && body.pw === result[0].user_pw) {
        console.log("로그인 성공");
        console.log(result[0]);
        //세션에 추가
        req.session.isLoggedIn = true;
        req.session.user_num = result[0].user_num;
        req.session.name = result[0].user_name;
        req.session.id = result[0].user_id;
        req.session.save(() => {
          res.redirect("/");
        });
        //세션 스토어에 적용하는 작업
        res.redirect("/");
      } else {
        console.log("로그인 실패", body);
        res.send(
          '<script>alert("아이디, 비밀번호 확인");window.open("signUp")</script>'
        );
      }
    }
  );
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
