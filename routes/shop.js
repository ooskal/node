const path = require("path");

const express = require("express");

const connection = require("../util/database");

const shopController = require("../controllers/shop");

const router = express.Router();

const mysql = require("mysql2");

connection.connect();

router.get("/shop/login", shopController.getLogin);

router.get("/shop/sign", shopController.getSign);

router.post("/shop/sign", shopController.PostSign);

router.get("/", shopController.getIndex);

router.get("/shop/books", shopController.getBooks);

module.exports = router;
