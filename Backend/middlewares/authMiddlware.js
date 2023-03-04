const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.header?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
      }
    } catch (error) {
      throw new Error("Not authorized, token expired, Please login !!! ");
    }
  } else {
    throw new Error("There is no token attached to your header...");
  }
});

module.exports = authMiddleware;
