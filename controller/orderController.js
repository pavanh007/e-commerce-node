const Order = require("../models/orderModel");
const APIFeatues = require("../utilities/apiFeatures");
const catchAsync = require("../utilities/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Order.create(req.body);
  // const order = newOrder;
  res.status(200).json({
    status: "success",
    data: newOrder,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: updatedOrder,
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);
  const order = deletedOrder._doc;
  res.status(200).json({
    status: "Order has been deleted",
    deletedOrder: order,
  });
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({ userId: req.params.userId });
  const orderDetails = order._doc;
  res.status(200).json({
    status: "order details",
    cart: orderDetails,
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const features = new APIFeatues(Order.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const orders = await features.query;
  res.status(200).json({
    status: "User details",
    user: orders,
  });
});


exports.orderStats = async (req, res, next) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.setMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.setMonth() - 1));
    const data = await Order.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount"
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.stats(500).json(error);
  }
};