const Cart = require("../models/cartModel");
const APIFeatues = require("../utilities/apiFeatures");
const catchAsync = require("../utilities/catchAsync");

exports.createCart = catchAsync(async (req, res, next) => {
  const newCart = await Cart.create(req.body);
  const cart = newCart._doc;
  res.status(200).json({
    status: "success",
    data: cart,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: updatedCart,
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const deletedCart = await Cart.findByIdAndDelete(req.params.id);
  const cart = deletedCart._doc;
  res.status(200).json({
    status: "Cart has been deleted",
    deletedCart: cart,
  });
});

exports.getUserCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({userId: req.params.userId});
  const cartDetails = cart._doc;
  res.status(200).json({
    status: "cart details",
    cart: cartDetails,
  });
});

exports.getAllCarts = catchAsync(async (req, res, next) => {
   const features = new APIFeatues(Cart.find(), req.query)
     .filter()
     .sort()
     .limitFields()
     .paginate();
  const carts = await features.query;
   res.status(200).json({
     status: "User details",
     user: carts,
   });

})


