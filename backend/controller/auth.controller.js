import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

// Signup function
export const signup = async (req, res, next) => {
  const { username, email, password, confirmPassword, gender } = req.body;

  try {
    // Check if user already exists
    let validUser = await User.findOne({ email });
    if (validUser) {
      return next(errorHandler(400, "User already exists"));
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      return next(errorHandler(400, "Passwords don't match"));
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set cookie and respond
    res.cookie("access_token", token, { httpOnly: true, secure: true }).status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

// Login function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Compare password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong DFG credentials"));
    }

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set cookie and respond
    res.cookie("access_token", token, { httpOnly: true, secure: true }).status(200).json({
      _id: validUser._id,
      username: validUser.username,
      email: validUser.email,
      profilePic: validUser.profilePic,
    });
  } catch (error) {
    next(error);
  }
};

// Logout function
export const logout = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been logged out successfully!" });
  } catch (error) {
    next(error);
  }
};
