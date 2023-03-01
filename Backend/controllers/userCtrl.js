const User = require("../models/userModel");
const httpStatus = require("http-status");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/jsonToken");

// Create User
exports.createUserCtrl = asyncHandler(async (req, res) => {
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

// Login user
exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  // Check for user
  const user = await User.findOne({ email });

  if (user && (await user.isPasswordMatched(password))) {
    res.status(httpStatus.OK).json({
      status: "success",
      user: {
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        token: generateToken(user?._id),
      },
    });
  } else {
    throw new Error("Invalid credentials, please try again...");
  }
});

// Get User
exports.getUserCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req?.params;

    const user = await User.findById(id);
    res.status(httpStatus.OK).json({
      status: "success",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Users
exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.status(httpStatus.OK).json({
      status: "success",
      results: user?.length,
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete User
exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  try {
    const { id } = req?.params;

    const user = await User.findByIdAndDelete(id);
    res.status(httpStatus.NO_CONTENT).json({
      status: "success",
      data : null
    });
  } catch (error) {
    throw new Error(error);
  }
});
