const { Sequelize, DataTypes } = require("sequelize");

// Sequelize instance create karna
const sequelize = new Sequelize("e-com", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const db = {};
db.sequelize = sequelize; // Sequelize instance store karo
db.connectDB = connectDB;

// Models ko add karo

db.user = require("../models/user")(sequelize, DataTypes);
db.product = require("../models/product")(sequelize, DataTypes);
db.category = require("../models/category")(sequelize, DataTypes);

db.product.associate(db);
db.category.associate(db);

// Sync database
db.sequelize
  .sync() // Automatically update table structure
  .then(() => {
    console.log("Database & tables updated!");
  })
  .catch((error) => {
    console.error("Error updating the database:", error);
  });

module.exports = db;
