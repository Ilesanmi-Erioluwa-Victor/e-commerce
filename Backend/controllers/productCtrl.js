const Product = require("../models/productModel");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");

exports.createProductCtrl = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req?.body);
    
      res.json(product);
  } catch (error) {
    throw new Error(error)
  }



});
