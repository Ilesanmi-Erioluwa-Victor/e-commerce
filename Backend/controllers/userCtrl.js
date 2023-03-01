const User = require("../models/userModel");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");

exports.createUser = asyncHandler(async (req, res) => {
  const email = req?.body?.email;

  const findUser = await User.findOne({ email });
  if (!findUser) {
    // Create a new user
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.status(httpStatus.CREATED).json({
      status: "success",
      user,
    });
  } else {
    //   User already exists
    throw new Error("User already exists, login to your account");
  }
});
