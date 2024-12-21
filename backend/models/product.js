module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
      imageUrl: { type: DataTypes.STRING },
    },
    {
      tableName: "products", // Ensure your table name matches this
      // timestamps: true, // Manage createdAt and updatedAt fields
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.category, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
    });
  };
  return Product;
};
