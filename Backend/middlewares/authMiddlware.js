const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.header?.authorization?.startsWith("Bearer")) {
        token = req?.headers?.authorization?.split(" ")[1];
        try {
            
        } catch (error) {
            
        }
    } else {
        throw new Error("There is no token attached to your header...")
    }
})

