const express = require("express");
const { generateQR, getQR } = require("../controllers/qrController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/generate", authMiddleware, generateQR);

router.get("/get", authMiddleware, getQR);

module.exports = router;