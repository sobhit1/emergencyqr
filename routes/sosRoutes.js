const express = require("express");
const { triggerSOS, getSOSHistory, resolveSOS } = require("../controllers/sosController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @desc Trigger an SOS alert and notify emergency contacts
 * @route POST /api/sos/trigger
 * @access Private (Requires JWT)
 */
router.post("/trigger", authMiddleware, triggerSOS);

/**
 * @desc Retrieve all SOS alerts for a user
 * @route GET /api/sos/history
 * @access Private (Requires JWT)
 */
router.get("/history", authMiddleware, getSOSHistory);

/**
 * @desc Resolve an SOS alert (Admin or User)
 * @route PUT /api/sos/resolve/:id
 * @access Private (Requires JWT)
 */
router.put("/resolve/:id", authMiddleware, resolveSOS);

module.exports = router;