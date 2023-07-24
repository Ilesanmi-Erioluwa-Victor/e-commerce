const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlware');
const { createBlog } = require('../controllers/blogCtrl');

const blogRoute = express.Router();
blogRoute.post('/', authMiddleware, isAdmin, createBlog);
module.exports = blogRoute;
