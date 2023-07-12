const Product = require('../models/productModel');
const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

// Create Product
exports.createProductCtrl = asyncHandler(async (req, res) => {
  try {
    if (req?.body?.title) {
      req.body.slug = slugify(req?.body?.title);
    }
    const product = await Product.create(req?.body);

    res.status(httpStatus.CREATED).json({
      status: 'success',
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
      status: 'success',
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// update product
exports.updateProductCtrl = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(httpStatus.CREATED).json({
      status: 'success',
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete product
exports.deleteProductCtrl = asyncHandler(async (req, res) => {
  const id = req?.params?.id;
  try {
    const product = await Product.findByIdAndDelete(id);

    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      product: null,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get all products
exports.getAllProductsCtrl = asyncHandler(async (req, res) => {
  try {
   // 1 Filtering
    // const products = await Product.where("category").equals(req.query.category)
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limits', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    let query = Product.find(JSON.parse(queryString));

    // 2 Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(" ");
      query = query.sort(sortBy)
    } else {
      query = query.sort("-createdAt")
     }

    // 3 limit
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields)
    } else {
      query = query.select("__v")
    }
    
    const product = await query;
    res.status(httpStatus.CREATED).json({
      results: product.length,
      status: 'success',
      product,
    });
  } catch (error) {
    throw new Error(error);
  }
});
