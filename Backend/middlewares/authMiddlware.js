const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req?.headers?.authorization?.split(' ')[1];
    try {
      if (!token) {
        return res
          .status(401)
          .json({ message: 'There is no token attached to your header...' });
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded?.id);
        if (!user) {
          return res
            .status(401)
            .json({ message: 'Invalid token or user not found.' });
        }
        req.user = user;
        next();
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const email = req?.user?.email;
    const adminUser = await User.findOne({ email });
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'You are not an admin.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = { authMiddleware, isAdmin };
