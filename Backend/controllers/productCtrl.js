const Product = require("../models/productModel");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");

exports.createProductCtrl = asyncHandler(async (req, res) => {
  const product = await Product.create();

  res.send("Hello from products...");
});
