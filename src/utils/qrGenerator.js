const QRCode = require("qrcode");

const generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(JSON.stringify(data));
  } catch (err) {
    console.error("QR Code Generation Error:", err);
    throw new Error("Failed to generate QR Code");
  }
};

module.exports = generateQRCode;