const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProductbyId,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");
const upload = require("../middleware/multer"); // Correctly import the multer instance

const router = express.Router();

// Use the upload middleware with the correct field name 'image'
router.post("/createproduct", upload.single("image"), createProduct);
router.get("/getallproduct", getAllProduct);
router.get("/getsingle/:id", getProductbyId);
router.get("/delete/:id", deleteProduct);
router.put("/update/:id", upload.single("image"), updateProduct);

module.exports = router;
