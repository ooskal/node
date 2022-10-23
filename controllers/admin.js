const Product = require("../model/product");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "753698",
  database: "book",
});

connection.connect();

exports.getAddProduct = (req, res, next) => {
  res.render("admin/product", {
    path: "/admin/product",
    pageTitle: "product",
  });
};
//책 추가
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  console.log(req.body);
  var sql_insert = {
    title: title,
    price: price,
  };
  connection.query(
    "select title from books where title=?",
    [title],
    function (err, rows) {
      if (err) throw err;
      if (rows.length) {
        res.json({ reslut: "fail" });
      } else {
        connection.query(
          "insert into books set?",
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
