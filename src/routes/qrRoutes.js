const express = require("express");
const { generateQR, getQR } = require("../controllers/qrController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @desc Generate a QR code for a user
 * @route GET /api/qr/generate
 * @access Private (Requires JWT)
 */
router.get("/generate", authMiddleware, generateQR);

/**
 * @desc Retrieve the user's QR code
 * @route GET /api/qr/get
 * @access Private (Requires JWT)
 */
router.get("/get", authMiddleware, getQR);

module.exports = router;