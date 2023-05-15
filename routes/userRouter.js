const express = require("express");
const authController  = require("../controller/authController");
const userController = require("../controller/userController");
const router = express.Router();
const cryptoJS = require("crypto-js");
const User = require("../models/userModel");

router
  .route('/find/:id')
  .put(authController.verifyTokenAndAutherization, userController.updateUser)
  .delete(authController.verifyTokenAndAdmin, userController.deleteUser)
  .get(authController.verifyTokenAndAdmin, userController.getUser);

router.get('/',authController.verifyTokenAndAdmin, userController.getAllUser);
router.get("/stats", userController.userStats);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

module.exports = router;
