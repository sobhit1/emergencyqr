const SOS = require("../models/SOS");

const detectFakeReports = async (ip) => {
  try {
    const requests = await SOS.find({ IPAddress: ip }).sort({ timestamp: -1 }).limit(5);

    if (requests.length === 5) {
      const oldestRequest = requests[requests.length - 1];
      const timeDiff = Date.now() - new Date(oldestRequest.timestamp).getTime(); 

      return timeDiff < 10 * 60 * 1000; 
    }
    return false;
  } catch (err) {
    console.error("❌ Error in detectFakeReports:", err);
    return false;
  }
};

module.exports = detectFakeReports;