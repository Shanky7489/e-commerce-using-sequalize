const express = require("express");
const { connectDB } = require("./config/database");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoute");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000; // Use the port from .env file if available

connectDB();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser()); // Uncomment if you're using cookies

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);

// Test Route to verify database connection
app.get("/", (req, res) => {
  res.send("Server is running and connected to the database!");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
