const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * @desc Sends user query to Google's Gemini AI for first aid assistance
 * @param {String} query - User's first aid question
 * @returns {Promise<String>} - AI-generated response
 */
const askGemini = async (query) => {
  try {
    const prompt = `${query}\n\nProvide first aid guidein step by step in a clear, short and concise manner.`;
    const result = await model.generateContent(prompt);
    return result.response.text(); // Extract AI-generated text
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    throw new Error("Failed to retrieve first aid response.");
  }
};

module.exports = askGemini;