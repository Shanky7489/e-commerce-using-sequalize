module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
      unique: true, // Unique email addresses
      validate: {
        isEmail: true, // Check for valid email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically add timestamp
    },
  });

  return User;
};
