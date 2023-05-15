const express = require("express");
const authController = require("../controller/authController");
const orderController = require("../controller/orderController");
const VT = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/find/:userId")
  .put(authController.verifyTokenAndAdmin, orderController.updateOrder)
  .delete(authController.verifyTokenAndAdmin, orderController.deleteOrder)
  .get(authController.verifyTokenAndAutherization, orderController.getUserOrders);

router
  .route("/")
  .get(authController.verifyTokenAndAdmin, orderController.getAllOrders)
  .post(VT.verifyToken, orderController.createOrder);

router.get(
  "/income",
  authController.verifyTokenAndAdmin,
  orderController.orderStats
);
module.exports = router;
