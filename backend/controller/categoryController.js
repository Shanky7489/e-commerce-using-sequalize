const db = require("../config/database");

const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    // Validate request
    if (!category_name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    // Create a new category
    const category = await db.category.create({
      category_name,
    });

    res.status(201).json({
      message: "Category created successfully!",
      category,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the category." });
  }
};

module.exports = { createCategory };
