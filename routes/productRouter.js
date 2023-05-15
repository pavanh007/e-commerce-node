const express = require("express");
const authController = require("../controller/authController");
const productController = require("../controller/productController");
const VT = require("../middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(VT.verifyToken, productController.createProduct)
  .get(productController.getAllProducts);

router
  .route("/:id")
  .put(authController.verifyTokenAndAdmin, productController.updateProduct)
  .delete(authController.verifyTokenAndAdmin, productController.deleteProduct)
  .get(productController.getProduct);


module.exports = router;
