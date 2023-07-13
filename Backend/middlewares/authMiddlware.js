const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      if (!process.env.JWT_SECRET_KEY)
        throw new Error('SERVER JWT PASSWORD NOT SET');

      if (!token)
        throw new Error('There is no token attached to your header...');

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded.id;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const id = req?.user;
    const adminUser = await User.findById(id);
    if (!adminUser || adminUser.role !== 'admin') {
      throw new Error('You are not an admin.');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware, isAdmin };
