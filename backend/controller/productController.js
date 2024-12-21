const db = require("../config/database"); // Path to your database config
const Product = db.product; // Access the Product model

// Controller to create a new product
const createProduct = async (req, res) => {
  console.log(req.body);
  try {
    const { name, description, price, category_id } = req.body;
    // Validate required fields
    if (!name || !description || !price || !category_id) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if a file was uploaded
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create the product
    const product = await Product.create({
      name,
      description,
      price,
      category_id,
      imageUrl,
    });

    res.status(201).json({
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await db.product.findAll({
      include: [
        {
          model: db.category, // Ensure 'db.category' is referenced properly
          attributes: ["category_name"],
        },
      ],
    });
    res.status(200).json({ message: "all product are fetched", products });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error file running the getallproduct" });
  }
};

const getProductbyId = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Fetch product by primary key (id)
    const product = await db.product.findByPk(orderId, {
      include: [
        {
          model: db.category,
          attributes: ["category_name"], // Include category name
        },
      ],
    });

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Return the product data
    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const orderId = req.params.id;

    const product = await db.product.findByPk(orderId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const deleted = await product.destroy();

    res.status(200).json({ message: "product deleted successfully", deleted });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error file running the getallproduct" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract product ID from request parameters
    const { name, description, price, category_id, imageUrl } = req.body; // Extract updated fields from the request body

    // Check if the product exists
    const product = await db.product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product
    const updatedProduct = await product.update({
      name,
      description,
      price,
      category_id,
      imageUrl,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "An error occurred while updating the product",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductbyId,
  deleteProduct,
  updateProduct,
};
