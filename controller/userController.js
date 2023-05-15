const User = require("../models/userModel");
const APIFeatues = require("../utilities/apiFeatures");
const catchAsync = require("../utilities/catchAsync");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const _ = require("underscore");

exports.registerUser = catchAsync(async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  const result = await newUser.save();
  const { password, ...others } = result._doc;
  res.status(201).json({
    status: "success",
    data: others,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  !user && res.status(401).json("Wrong credentails!");

  const hashedPassword = cryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SEC
  );
  const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);
  originalPassword !== req.body.password &&
    res.status(401).json("Wrong credentials!!");
  const accessToken = jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );
  const { password, ...others } = user._doc;
  res.status(200).json({
    status: "Success",
    data: { ...others, accessToken: accessToken },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (!req.body.password) {
    return next(new AppError("password should not null", 400));
  }
  req.body.password = cryptoJS.AES.encrypt(
    req.body.password,
    process.env.PASS_SEC
  ).toString();
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  res.stats(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  const { password, ...others } = deletedUser._doc;
  res.status(200).json({
    status: "User has been deleted",
    deleteduser: others,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const { password, ...others } = user._doc;
  res.status(200).json({
    status: "User details",
    user: { ...others },
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const features = new APIFeatues(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  res.status(200).json({
    status: "User details",
    user: users,
  });
});

exports.userStats = async (req, res, next) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.stats(500).json(error);
  }
};
