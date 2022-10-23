const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/product", adminController.getAddProduct);
router.post("/product", adminController.postAddProduct);

module.exports = router;
