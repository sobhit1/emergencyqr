const express = require("express");
const { triggerSOS, getSOSHistory, resolveSOS } = require("../controllers/sosController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/trigger", authMiddleware, triggerSOS);

router.get("/history", authMiddleware, getSOSHistory);

router.put("/resolve/:id", authMiddleware, resolveSOS);

module.exports = router;