const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlware');

const blogRoute = express.Router();
blogRoute.post("/", authMiddleware, isAdmin)
module.exports = blogRoute;
