const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlware');
const { createBlog, updateBlog, getBlog, getBlogs } = require('../controllers/blogCtrl');

const blogRoute = express.Router();
blogRoute.post('/', authMiddleware, isAdmin, createBlog);
blogRoute.put('/:id', authMiddleware, isAdmin, updateBlog);
blogRoute.get('/:id', getBlog);
blogRoute.get('/', authMiddleware, isAdmin, getBlogs);
module.exports = blogRoute;
