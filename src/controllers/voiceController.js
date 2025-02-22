const speech = require("@google-cloud/speech");
const fs = require("fs");
const twilio = require("twilio");
const SOS = require("../models/SOS");
const User = require("../models/User");
const detectFakeReports = require("../utils/fraudDetection");

const client = new speech.SpeechClient();

const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.voiceSOS = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No audio file uploaded!" });

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const audioBytes = fs.readFileSync(req.file.path).toString("base64");

    const request = {
      audio: { content: audioBytes },
      config: { encoding: "LINEAR16", sampleRateHertz: 16000, languageCode: "en-US" },
    };

    const [response] = await client.recognize(request);
    const transcript = response.results.map(result => result.alternatives[0].transcript).join("\n");

    console.log("🔊 Recognized Speech:", transcript);

    if (transcript.toLowerCase().includes("help me")) {
      const isFake = await detectFakeReports(user._id);
      if (isFake) return res.status(403).json({ message: "Suspicious activity detected, SOS blocked!" });

      const sosAlert = await SOS.create({
        userId: user._id,
        location: { lat: "Unknown", long: "Unknown" }, 
      });

      const message = `🚨 Voice SOS Alert! ${user.name} needs help. Blood Type: ${user.bloodType}. Medical History: ${user.medicalHistory}`;

      for (const contact of user.emergencyContacts) {
        await twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: contact.phone,
        });
      }

      res.status(200).json({ message: "🚀 SOS triggered successfully via voice!", sosAlert });
    } else {
      res.status(400).json({ message: "No SOS command detected!" });
    }
  } catch (err) {
    console.error("Voice SOS Error:", err);
    res.status(500).json({ message: "Failed to process voice SOS" });
  }
};