const speech = require("@google-cloud/speech");
const recorder = require("node-record-lpcm16");
const EventEmitter = require("events");

class VoiceTrigger extends EventEmitter {
  constructor() {
    super();
    this.client = new speech.SpeechClient();
  }

  startListening() {
    console.log("🎙️ Voice detection activated... Say 'Help me' to trigger SOS!");

    const request = {
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-US",
      },
      interimResults: true, // Get real-time speech results
    };

    const recognizeStream = this.client
      .streamingRecognize(request)
      .on("error", (err) => console.error("❌ Speech Recognition Error:", err))
      .on("data", (data) => {
        const transcript = data.results[0]?.alternatives[0]?.transcript || "";
        console.log("🔊 Detected Speech:", transcript);

        if (transcript.toLowerCase().includes("help me")) {
          console.log("🚨 Emergency SOS Triggered!");
          this.emit("sos"); // Emit event when "Help me" is detected
        }
      });

    recorder
      .record({
        sampleRateHertz: 16000,
        threshold: 0.5,
        recordProgram: "sox",
        silence: "10.0",
      })
      .stream()
      .pipe(recognizeStream);
  }
}

module.exports = new VoiceTrigger();