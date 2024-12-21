const express = require("express");
const {
  registerUser,
  LoginUser,
  logoutUser,
} = require("../controller/userController");

const router = express.Router();

// Use the upload middleware with the correct field name 'image'
router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get("/logout", logoutUser);

module.exports = router;
