const speech = require("@google-cloud/speech");
const fs = require("fs");

const client = new speech.SpeechClient();

const recognizeSpeech = async (audioPath) => {
  try {
    const audioBytes = fs.readFileSync(audioPath).toString("base64");

    const request = {
      audio: { content: audioBytes },
      config: { encoding: "LINEAR16", sampleRateHertz: 16000, languageCode: "en-US" },
    };

    const [response] = await client.recognize(request);

    const transcript = response.results.map(result => result.alternatives[0].transcript).join("\n");
    
    console.log("🔊 Recognized Speech:", transcript);
    return transcript;
  } catch (err) {
    console.error("❌ Speech Recognition Error:", err);
    throw new Error("Failed to recognize speech");
  }
};

module.exports = recognizeSpeech;