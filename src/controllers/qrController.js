const User = require("../models/User");
const generateQRCode = require("../utils/qrGenerator");

/**
 * @desc Generate QR code for a user
 * @route GET /api/qr/generate
 * @access Private (Requires JWT Authentication)
 */
exports.generateQR = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const profileLink = `https://yourwebsite.com/profile/${user._id}`;

    // Data to encode in QR Code
    const qrData = {
      id: user._id,
      name: user.name,
      bloodType: user.bloodType,
      medicalHistory: user.medicalHistory,
      emergencyContacts: user.emergencyContacts,
      profileLink : profileLink
    };

    // Generate QR Code
    const qrCodeURL = await generateQRCode(qrData);

    // Save QR Code URL in the database
    user.qrCode = qrCodeURL;
    await user.save();

    res.status(200).json({ message: "QR Code generated successfully", qrCode: qrCodeURL });
  } catch (err) {
    console.error("QR Code Error:", err);
    res.status(500).json({ message: "Failed to generate QR Code" });
  }
};

/**
 * @desc Retrieve user's QR code
 * @route GET /api/qr/get
 * @access Private (Requires JWT Authentication)
 */
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