const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
router.post("/register", register);

/**
 * @desc Login user & return JWT token
 * @route POST /api/auth/login
 * @access Public
 */
router.post("/login", login);

/**
 * @desc Get authenticated user profile
 * @route GET /api/auth/me
 * @access Private (Requires JWT)
 */
router.get("/me", authMiddleware, getProfile);

module.exports = router;