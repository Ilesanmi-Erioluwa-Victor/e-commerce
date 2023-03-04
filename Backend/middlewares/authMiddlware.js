const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.header?.authorization?.startsWith("Bearer")) {
        
    } else {
        throw new Error("")
    }
})

