const Product = require("../models/productModel");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
// Create Product
exports.createProductCtrl = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req?.body);

    res.status(httpStatus.CREATED).json({
      status: "success",
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get product
exports.getProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const product = await Product.findById(id);

    res.status(httpStatus.CREATED).json({
      status: "success",
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get all products
exports.getAllProductsCtrl = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(httpStatus.CREATED).json({
      results: products.length,
      status: "success",
      products,
    });
  } catch (error) {
    throw new Error(error);
  }
});
