const QRCode = require("qrcode");

/**
 * @desc Generates a QR code with the given data
 * @param {Object} data - Data to encode in the QR code
 * @returns {Promise<String>} - Returns a QR code as a Base64 URL
 */
const generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(JSON.stringify(data));
  } catch (err) {
    console.error("❌ QR Code Generation Error:", err);
    throw new Error("Failed to generate QR Code");
  }
};

module.exports = generateQRCode;