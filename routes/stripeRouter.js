const express = require("express");
const router = express.Router();
const { payment } = require("../services/stripe");

router.post("/payment", payment);


module.exports = router;
