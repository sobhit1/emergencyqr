const twilio = require("twilio");
const SOS = require("../models/SOS");
const User = require("../models/User");
const detectFakeReports = require("../utils/fraudDetection");

// Twilio client setup
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * @desc Trigger an SOS alert and notify emergency contacts
 * @route POST /api/sos/trigger
 * @access Private (Requires JWT Authentication)
 */
exports.triggerSOS = async (req, res) => {
  try {
    const { location } = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check for fake reports
    const isFake = await detectFakeReports(user._id);
    if (isFake) return res.status(403).json({ message: "Suspicious activity detected, SOS blocked!" });

    // Create SOS record in the database
    const sosAlert = await SOS.create({
      userId: user._id,
      location,
    });

    const message = `🚨 SOS Alert! ${user.name} needs help at ${location.lat}, ${location.long}. Blood Type: ${user.bloodType}. Medical History: ${user.medicalHistory}`;

    // Send SMS to emergency contacts
    for (const contact of user.emergencyContacts) {
      await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: contact.phone,
      });
    }

    res.status(200).json({ message: "🚀 SOS sent successfully!", sosAlert });
  } catch (err) {
    console.error("❌ SOS Trigger Error:", err);
    res.status(500).json({ message: "Failed to send SOS alert" });
  }
};

/**
 * @desc Retrieve all SOS alerts for a user
 * @route GET /api/sos/history
 * @access Private (Requires JWT Authentication)
 */
exports.getSOSHistory = async (req, res) => {
  try {
    const sosHistory = await SOS.find({ userId: req.user }).sort({ timestamp: -1 });

    if (!sosHistory.length) return res.status(404).json({ message: "No SOS alerts found!" });

    res.status(200).json(sosHistory);
  } catch (err) {
    console.error("❌ Error Fetching SOS History:", err);
    res.status(500).json({ message: "Failed to retrieve SOS history" });
  }
};

/**
 * @desc Resolve an SOS alert (Admin or User)
 * @route PUT /api/sos/resolve/:id
 * @access Private (Requires JWT Authentication)
 */
exports.resolveSOS = async (req, res) => {
  try {
    const sosAlert = await SOS.findById(req.params.id);
    if (!sosAlert) return res.status(404).json({ message: "SOS alert not found" });

    sosAlert.resolved = true;
    await sosAlert.save();

    res.status(200).json({ message: "✅ SOS alert marked as resolved", sosAlert });
  } catch (err) {
    console.error("❌ Error Resolving SOS:", err);
    res.status(500).json({ message: "Failed to resolve SOS alert" });
  }
};