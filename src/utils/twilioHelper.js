const twilio = require("twilio");

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

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
    console.log("SOS Messages Sent Successfully!");
  } catch (err) {
    console.error("Twilio Error:", err);
    throw new Error("Failed to send SOS alert");
  }
};

module.exports = sendSOSAlert;