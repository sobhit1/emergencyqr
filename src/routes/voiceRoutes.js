const express = require("express");
const { triggerVoiceSOS } = require("../controllers/voiceController.js");

const router = express.Router();

router.get("/start", (req, res) => {
  try {
    console.log("Starting Voice Activation for SOS...");
    res.status(200).json({ message: "Voice SOS listening activated!" });
  } catch (err) {
    console.error("Error starting voice activation:", err);
    res.status(500).json({ message: "Failed to start voice SOS." });
  }
});

module.exports = router;