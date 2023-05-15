const jwt = require("jsonwebtoken");
const VT = require("../middleware/verifyToken");

exports.verifyTokenAndAutherization = (req, res, next) => {
  VT.verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do!");
    }
  });
};

exports.verifyTokenAndAdmin = (req, res, next) => {
  VT.verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do!");
    }
  });
};
