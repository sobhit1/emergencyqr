const express = require("express");
const { askFirstAid } = require("../controllers/chatbotController.js");

const router = express.Router();

router.post("/ask", askFirstAid);

module.exports = router;