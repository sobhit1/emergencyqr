const express = require("express");
const { triggerVoiceSOS } = require("../controllers/voiceController.js");

const router = express.Router();

/**
 * @desc Start voice detection for SOS
 * @route GET /api/voice-sos/start
 */
router.get("/start", (req, res) => {
  try {
    console.log("🎤 Starting Voice Activation for SOS...");
    res.status(200).json({ message: "Voice SOS listening activated!" });
  } catch (err) {
    console.error("❌ Error starting voice activation:", err);
    res.status(500).json({ message: "Failed to start voice SOS." });
  }
});

module.exports = router;