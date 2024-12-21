const express = require("express");
const { createCategory } = require("../controller/categoryController");

const router = express.Router();

// Use the upload middleware with the correct field name 'image'
router.post("/createCategory", createCategory);

module.exports = router;
