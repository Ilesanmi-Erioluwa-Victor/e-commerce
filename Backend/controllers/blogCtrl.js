const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ValidateMongoId = require('../utils/validateMongoId');

exports.createBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.updateBlog = asyncHandler(async (req, res) => {
  try {
      const { id } = req?.params;
      ValidateMongoId(id)
      if (!id) {
          throw new Error("No ID provided")
      }
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

exports.getBlog = asyncHandler(async (req, res) => {
  try {
      const { id } = req?.params;
          ValidateMongoId(id);
          if (!id) {
            throw new Error('No ID provided');
          }
    const blog = await Blog.findById(id);

    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});
