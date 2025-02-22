const express = require("express");
const { askFirstAid } = require("../controllers/chatbotController.js");

const router = express.Router();

/**
 * @desc AI-powered First Aid Chatbot API
 * @route POST /api/chatbot/ask
 * @access Public
 */
router.post("/ask", askFirstAid);

module.exports = router;