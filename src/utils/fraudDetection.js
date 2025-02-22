const SOS = require("../models/SOS");

/**
 * @desc Detects fake SOS alerts by analyzing recent SOS requests
 * @param {String} userId - ID of the user sending the SOS request
 * @returns {Promise<Boolean>} - Returns true if suspicious activity is detected, otherwise false
 */
const detectFakeReports = async (ip) => {
  try {
    // Fetch last 5 SOS requests from this IP
    const requests = await SOS.find({ IPAddress: ip }).sort({ timestamp: -1 }).limit(5);

    if (requests.length === 5) { // If exactly 5 requests exist
      const oldestRequest = requests[requests.length - 1]; // Get the oldest request
      const timeDiff = Date.now() - new Date(oldestRequest.timestamp).getTime(); // Convert to milliseconds

      return timeDiff < 10 * 60 * 1000; // Return true if within 10 minutes
    }
    return false;
  } catch (err) {
    console.error("❌ Error in detectFakeReports:", err);
    return false; // Fallback to allowing SOS if there's an error
  }
};

module.exports = detectFakeReports;