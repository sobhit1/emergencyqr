const User = require("../models/User");
const SOS = require("../models/SOS");
const twilio = require("twilio");
const voiceTrigger = require("../utils/googleAssistant");

const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const triggerVoiceSOS = async () => {
  try {
    console.log("🔴 SOS ACTIVATED! Searching for the user...");

    // Assuming the user is logged in (replace with actual logic to find the active user)
    const user = await User.findOne(); // Replace this with actual user identification logic
    if (!user) {
      console.log("❌ No user found!");
      return;
    }

    // Create SOS record
    const sosAlert = await SOS.create({
      userId: user._id,
      location: { lat: "Unknown", long: "Unknown" }, // Optional: Get real location
    });

    // Prepare emergency alert message
    const message = `🚨 Voice SOS Alert! ${user.name} needs help! Blood Type: ${user.bloodType}. Medical History: ${user.medicalHistory}`;

    // Send SMS alert to emergency contacts
    for (const contact of user.emergencyContacts) {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: contact.phone,
      });
    }

    console.log("✅ Voice SOS successfully triggered!");
  } catch (err) {
    console.error("❌ Voice SOS Error:", err);
  }
};

// Listen for "Help me" and activate SOS
voiceTrigger.on("sos", triggerVoiceSOS);

module.exports = { triggerVoiceSOS };