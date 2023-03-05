const Product = require("../models/productModel");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");

// Create Product
exports.createProductCtrl = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req?.body);

    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

// Get product
exports.getProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const product = await Product.findById(id);

    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});


// Get all products
exports.getAllProductsCtrl = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});
