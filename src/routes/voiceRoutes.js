const express = require("express");
const multer = require("multer");
const { voiceSOS } = require("../controllers/voiceController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


const storage = multer.memoryStorage(); // This doesn't try to write to disk
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Example: limit to 10MB
  }
});


router.post("/sos", authMiddleware, upload.single("audio"), voiceSOS);

module.exports = router;