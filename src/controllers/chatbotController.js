const askGemini = require("../utils/geminiHelper");
const formatResponse = require("../utils/formatResponse");

exports.askFirstAid = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Please provide a question" });
        }

        const aiResponse = await askGemini(message);
        const formattedResponse = formatResponse(aiResponse);
        res.status(200).json({ message: formattedResponse });
    } catch (err) {
        console.error("❌ Chatbot Error:", err);
        res.status(500).json({ message: "Failed to get first aid advice" });
    }
};