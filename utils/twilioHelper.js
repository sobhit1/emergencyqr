const twilio = require("twilio");

// Twilio client setup
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * @desc Sends SOS alert messages via Twilio
 * @param {Array} phoneNumbers - List of emergency contact numbers
 * @param {String} message - SOS alert message to send
 * @returns {Promise<void>}
 */
const sendSOSAlert = async (phoneNumbers, message) => {
  try {
    const promises = phoneNumbers.map((phone) => 
      client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      })
    );

    await Promise.all(promises);
    console.log("✅ SOS Messages Sent Successfully!");
  } catch (err) {
    console.error("❌ Twilio Error:", err);
    throw new Error("Failed to send SOS alert");
  }
};

module.exports = sendSOSAlert;