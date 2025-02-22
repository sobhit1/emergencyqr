const express = require("express");
const { triggerSOS, getSOSHistory, resolveSOS } = require("../controllers/sosController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/trigger", triggerSOS);

router.get("/history", getSOSHistory);

router.put("/resolve/:id", resolveSOS);

module.exports = router;