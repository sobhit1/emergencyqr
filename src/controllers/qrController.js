const User = require("../models/User");
const generateQRCode = require("../utils/qrGenerator");

exports.generateQR = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const profileLink = `https://emergencyqr-frontend.vercel.app/profile/${user._id}`;

    const qrData = {
      id: user._id,
      name: user.name,
      bloodType: user.bloodType,
      medicalHistory: user.medicalHistory,
      emergencyContacts: user.emergencyContacts,
      profileLink: profileLink
    };

    const qrCodeURL = await generateQRCode(qrData);

    user.qrCode = qrCodeURL;
    await user.save();

    res.status(200).json({ message: "QR Code generated successfully", qrCode: qrCodeURL });
  } catch (err) {
    console.error("QR Code Error:", err);
    res.status(500).json({ message: "Failed to generate QR Code" });
  }
};

exports.getQR = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("qrCode");
    if (!user || !user.qrCode) return res.status(404).json({ message: "QR Code not found" });

    res.status(200).json({ qrCode: user.qrCode });
  } catch (err) {
    console.error("QR Retrieval Error:", err);
    res.status(500).json({ message: "Failed to retrieve QR Code" });
  }
};