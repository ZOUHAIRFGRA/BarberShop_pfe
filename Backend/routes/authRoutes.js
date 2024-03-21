const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  registerUser,
  registerBarber,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

router.post("/register/user", [check("email").isEmail(), check("password").isLength({ min: 6 })], registerUser);
router.post("/register/barber", [check("email").isEmail(), check("password").isLength({ min: 6 })], registerBarber);
router.post("/login", [check("email").isEmail(), check("password").isLength({ min: 6 })], loginUser);
router.get("/logout", logoutUser);

module.exports = router;
