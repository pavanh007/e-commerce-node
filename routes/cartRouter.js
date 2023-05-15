const express = require("express");
const authController = require("../controller/authController");
const cartController = require("../controller/cartController");
const VT = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/find/:userId")
  .put(authController.verifyTokenAndAutherization, cartController.updateCart)
  .delete(authController.verifyTokenAndAutherization, cartController.deleteCart)
  .get(authController.verifyTokenAndAutherization, cartController.getUserCart);

router
  .route("/")
  .get(authController.verifyTokenAndAdmin, cartController.getAllCarts)
  .post(VT.verifyToken, cartController.createCart);


module.exports = router;
