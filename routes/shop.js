const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "753698",
  database: "book",
});

connection.connect();

router.get("/shop/login", shopController.getLogin);

router.get("/shop/sign", shopController.getSign);

router.post("/shop/sign", shopController.PostSign);

router.get("/", shopController.getIndex);

module.exports = router;
