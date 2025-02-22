const express = require("express");
const multer = require("multer");
const { voiceSOS } = require("../controllers/voiceController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/sos", authMiddleware, upload.single("audio"), voiceSOS);

module.exports = router;