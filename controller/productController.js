const Product = require("../models/productModel");
const APIFeatues = require("../utilities/apiFeatures");
const catchAsync = require("../utilities/catchAsync");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  const product = newProduct._doc;
  res.status(200).json({
    status: "success",
    data: product,
  });
});


exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: updatedProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  const product = deletedProduct._doc;
  res.status(200).json({
    status: "product has been deleted",
    deletedProduct: product,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const productDetails = product._doc;
  res.status(200).json({
    status: "product details",
    product: productDetails,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatues(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;
  res.status(200).json({
    status: "Product details",
    products: products,
  });
});


