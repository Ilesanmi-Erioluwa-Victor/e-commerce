const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlware');
const { createBlog, updateBlog } = require('../controllers/blogCtrl');

const blogRoute = express.Router();
blogRoute.post('/', authMiddleware, isAdmin, createBlog);
blogRoute.put('/:id', authMiddleware, isAdmin, updateBlog);
blogRoute.put('/:id', authMiddleware, isAdmin, updateBlog);
module.exports = blogRoute;
