const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlware');
const { createBlog, updateBlog, getBlog } = require('../controllers/blogCtrl');

const blogRoute = express.Router();
blogRoute.post('/', authMiddleware, isAdmin, createBlog);
blogRoute.put('/:id', authMiddleware, isAdmin, updateBlog);
blogRoute.get('/:id', getBlog);
module.exports = blogRoute;
