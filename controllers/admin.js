const Product = require("../model/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/product", {
    path: "/admin/product",
    pageTitle: "product",
  });
};
