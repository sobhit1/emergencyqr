const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const askGemini = async (query) => {
  try {
    const prompt = `${query}\n\nProvide a first aid guide step by step in a clear, short, and concise manner, considering the user's medical conditions.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini API Error:", err);
    throw new Error("Failed to retrieve first aid response.");
  }
};

module.exports = askGemini;