const joi = require("joi");
const bcrypt = require("bcrypt");
const db = require("../config/database");
const jwt = require("jsonwebtoken");

const userValidation = joi.object({
  username: joi.string().min(3).max(20).required().messages({
    "string.empty": "Username is required.",
    "string.min": "Username should have at least 3 characters.",
    "string.max": "Username cannot exceed 30 characters.",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),
  password: joi.string().min(4).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password should have at least 4 characters.",
  }),
});

const loginValidation = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),
  password: joi.string().min(4).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password should have at least 4 characters.",
  }),
});

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { error } = userValidation.validate({ username, email, password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const ExistingUser = await db.user.findOne({ where: { email } });
    if (ExistingUser) {
      return res
        .status(400)
        .json({ error: "user already exist with the given email" });
    }

    // Hash the password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    //craete new user
    const newUser = await db.user.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User registered successfully!",

      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      newUser,
    });
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate the user
    const { error } = loginValidation.validate({ email, password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const userData = await db.user.findOne({ where: { email } });
    if (!userData) {
      // Corrected this condition
      return res.status(404).json({ error: "User not found with this email" });
    }

    const comparePassword = await bcrypt.compare(password, userData.password);

    if (!comparePassword) {
      return res.status(400).json({ error: "Invalid password." });
    }

    const token = jwt.sign(
      { userData },
      process.env.JWT_SECRET_KEY || "shanky",
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true, // Can't be accessed by JavaScript (helps prevent XSS attacks)
      secure: true, // Only use secure cookies in production (requires HTTPS)
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
      path: "/", // Cookie is available across the entire site
    });

    res.status(200).json({
      message: "User logged in successfully!",
      token, // Send the JWT token
      // userData: {
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      // },
    });
  } catch (error) {
    console.log(error, "while login");
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again. while login" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ error: "Something went wrong during logout." });
  }
};

module.exports = { registerUser, LoginUser, logoutUser };
