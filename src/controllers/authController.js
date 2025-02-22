const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/tokenGenerator");

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, emergencyContacts, bloodType, medicalHistory } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      emergencyContacts,
      bloodType,
      medicalHistory,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Login user & get JWT token
 * @route POST /api/auth/login
 * @access Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get user profile
 * @route GET /api/auth/me
 * @access Private
 */
exports.getProfile = async (req, res) => {
  try {
    // Get user ID from request
    const user = await User.findById(req.user._id).select("-password");

    // If user does not exist
    if (!user) return res.status(404).json({ message: "User not found" });

    // Send user data as response
    res.json(user);
  } catch (err) {
    console.error("❌ Error fetching user profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};