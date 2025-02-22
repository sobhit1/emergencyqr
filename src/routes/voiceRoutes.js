const express = require("express");
const multer = require("multer");
const { voiceSOS } = require("../controllers/voiceController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Configure Multer for handling audio file uploads
const upload = multer({ dest: "uploads/" });

/**
 * @desc Process voice input and trigger SOS if "help me" is detected
 * @route POST /api/voice/sos
 * @access Private (Requires JWT)
 */
router.post("/sos", authMiddleware, upload.single("audio"), voiceSOS);

module.exports = router;