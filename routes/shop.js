const path = require("path");

const express = require("express");

const connection = require("../util/database");

const shopController = require("../controllers/shop");

const router = express.Router();

const mysql = require("mysql2");

connection.connect();

//로그인
router.post("/shop/login", shopController.postLogin);
router.get("/shop/login", shopController.getLogin);
router.get("/logout", shopController.getLogout);

//회원가입
router.get("/shop/sign", shopController.getSign);

router.post("/shop/sign", shopController.PostSign);

router.get("/", shopController.getIndex);

router.post("/", shopController.postIndex);

router.get("/shop/books", shopController.getBooks);

router.get("/shop/book-detail", shopController.getBookDetail);

module.exports = router;
