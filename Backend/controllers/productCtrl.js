const Product = require("../models/productModel");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");

exports.createProduct = asyncHandler(async (req, res) => {
    const product =  await Product.create()
});
