const express = require("express");
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRouter.js');
const ProductRouter = require("./routes/productRouter.js");
const OrderRouter = require("./routes/orderRouter.js");
const CartRouter = require("./routes/cartRouter.js");
const AppError = require("./utilities/appError.js");


//Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

//Development logging configuration
if (process.env.NODE_ENV === "DEV") {
  console.log("morgan is Enabled");
  app.use(morgan("tiny"));
}
//Testting middleware
app.use((req, res, next) => {
  requestTime = new Date().toISOString();
  console.log(`Time : ${requestTime}`)
  next();
});
app.use("/v1/users", userRouter);
app.use("/v1/products", ProductRouter);
app.use("/v1/orders", OrderRouter);
app.use("/v1/cart", CartRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
