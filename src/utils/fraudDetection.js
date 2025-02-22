const SOS = require("../models/SOS");

/**
 * @desc Detects fake SOS alerts by analyzing recent SOS requests
 * @param {String} userId - ID of the user sending the SOS request
 * @returns {Promise<Boolean>} - Returns true if suspicious activity is detected, otherwise false
 */
const detectFakeReports = async (userId) => {
  try {
    // Find the last 5 SOS requests made by the user
    const sosRequests = await SOS.find({ userId }).sort({ timestamp: -1 }).limit(5);

    // If the user has made 5 SOS requests within 10 minutes, flag as suspicious
    if (sosRequests.length === 5) {
      const timeDiff = (new Date() - sosRequests[sosRequests.length - 1].timestamp) / 60000;
      if (timeDiff < 10) return true; // User is spamming SOS requests
    }

    return false; // No suspicious activity detected
  } catch (err) {
    console.error("❌ Fraud Detection Error:", err);
    return false;
  }
};

module.exports = detectFakeReports;