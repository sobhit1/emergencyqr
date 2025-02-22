const twilio = require("twilio");
const SOS = require("../models/SOS");
const User = require("../models/User");
const detectFakeReports = require("../utils/fraudDetection");

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.triggerSOS = async (req, res) => {
  try {
    const { id, location } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("User IP:", ip);

    const isFake = await detectFakeReports(ip);

    const sosAlert = await SOS.create({
      IPAddress: ip,
      location,
    });

    const message = `🚨 SOS Alert! ${user.name} needs help at ${location.lat}, ${location.long}. Blood Type: ${user.bloodType}. Medical History: ${user.medicalHistory}. ${isFake ? "(⚠️ BEWARE: THIS IP HAS BEEN FLAGGED FOR SUSPICIOUS ACTIVITY)" : ""}`;

    const emergencyNumbers = user.emergencyContacts || [
      { phone: "+919166062822" }, 
    ];

    for (const contact of emergencyNumbers) {
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