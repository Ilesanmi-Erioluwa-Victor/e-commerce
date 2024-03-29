const User = require('../models/userModel');
const httpStatus = require('http-status');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const generateToken = require('../configuration/jsonToken');
const ValidateMongoId = require('../utils/validateMongoId');
const generateRefreshToken = require('../configuration/refreshToken');
const crypto = require('crypto');
const { sendMail } = require('./emailCtrl');

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
      mobile: req.body.mobile,
    });
    res.status(httpStatus.CREATED).json({
      status: 'success',
      user,
    });
  } else {
    //   User already exists
    throw new Error('User already exists, login to your account');
  }
});

// Login user
exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  // Check for user
  const user = await User.findOne({ email });

  if (user && (await user.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(user?.id);
    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.status(httpStatus.OK).json({
      status: 'success',
      user: {
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        token: generateToken(user?._id),
      },
    });
  } else {
    throw new Error('Invalid credentials, please try again...');
  }
});

// Handle Refresh Handler.
exports.RefreshTokenHandlerCtrl = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error('No refresh token in cookies');
  const refreshToken = cookie?.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (!user)
    throw new Error('No refreshToken found in DB or not matched, try again...');

  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err || user?.id !== decoded?.id) {
      throw new Error('There is something wrong with refresh token');
    }

    const accessToken = generateToken(user?._id);

    res.status(httpStatus.OK).json({
      status: 'success',
      accessToken,
    });
  });
});

// Logout functionalities
exports.logOutCtrl = asyncHandler(async (req, res) => {
  const cookie = req?.cookies;
  if (!cookie?.refreshToken) throw new Error('No refresh token in cookies');
  const refreshToken = cookie?.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: '',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

// Get User
exports.getUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req?.params;

  ValidateMongoId(id);
  try {
    const user = await User.findById(id);
    res.status(httpStatus.OK).json({
      status: 'success',
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
      status: 'success',
      results: user?.length,
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete User
exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoId(id);
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(httpStatus.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update User
exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const { _id } = req?.user;
  ValidateMongoId(_id);

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req.body.mobile,
      },
      { new: true, runValidators: true }
    );
    res.status(httpStatus.OK).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// DBlock User
exports.blockUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'User blocked',
    });
  } catch (error) {
    throw new Error(error);
  }
});

// unBlock User
exports.unBlockUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'User unblocked',
    });
  } catch (error) {
    throw new Error(error);
  }
});

exports.updatePassword = asyncHandler(async (req, res) => {
  try {
    console.log(req.user);
    const _id = req?.user;
    const password = req.body.password;
    ValidateMongoId(_id);
    const user = await User.findById(_id);
    if (password) {
      user.password = password;

      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

exports.forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new Error('User not found with this email, try again');
  try {
    const token = await user.createPasswordResetToken();
    await user.save();

    const resetUrl = `If you were requested to reset your account password, reset now, otherwise ignore this message
        <a href= ${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/reset-token/${token}>Click to verify..</a>
       `;

    const data = {
      to: email,
      subject: 'Forgot password Link',
      text: 'Click here to reset your password',
      html: resetUrl,
    };
    sendMail(data);
    res.json({ token: token });
  } catch (error) {
    throw new Error(error);
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;
    const token = req?.params?.token;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gte: Date.now() },
    });

    if (!user) throw new Error('Token expired, try again');

    user.password = password;
    user.passwordResetToken = '';
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});
