const speech = require("@google-cloud/speech");
const fs = require("fs");

// Initialize Google Speech-to-Text Client
const client = new speech.SpeechClient();

/**
 * @desc Converts an audio file to text using Google Speech-to-Text API
 * @param {String} audioPath - Path to the audio file
 * @returns {Promise<String>} - Returns transcribed text
 */
const recognizeSpeech = async (audioPath) => {
  try {
    // Read audio file and convert it to base64
    const audioBytes = fs.readFileSync(audioPath).toString("base64");

    const request = {
      audio: { content: audioBytes },
      config: { encoding: "LINEAR16", sampleRateHertz: 16000, languageCode: "en-US" },
    };

    // Send request to Google Speech API
    const [response] = await client.recognize(request);

    // Extract and return the transcribed text
    const transcript = response.results.map(result => result.alternatives[0].transcript).join("\n");
    
    console.log("🔊 Recognized Speech:", transcript);
    return transcript;
  } catch (err) {
    console.error("❌ Speech Recognition Error:", err);
    throw new Error("Failed to recognize speech");
  }
};

module.exports = recognizeSpeech;