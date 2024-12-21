module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Yeh ensure karega ki createdAt aur updatedAt handle ho
    }
  );
  Category.associate = (models) => {
    Category.hasMany(models.product, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
    });
  };

  return Category;
};
