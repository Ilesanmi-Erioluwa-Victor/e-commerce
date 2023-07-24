const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ValidateMongoId = require('../utils/validateMongoId');

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
});
