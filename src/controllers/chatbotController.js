const askGemini = require("../utils/geminiHelper");
const formatResponse = require("../utils/formatResponse");
const User = require("../models/User");

exports.askFirstAid = async (req, res) => {
    try {
        const { message, id } = req.body;
        
        if (!message || !id) {
            return res.status(400).json({ message: "Please provide a question and user ID" });
        }

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const medicalHistory = user.medicalHistory || "No known medical conditions";

        const query = `User has the following medical history: ${medicalHistory}. Given this, ${message}`;

        const aiResponse = await askGemini(query);
        const formattedResponse = formatResponse(aiResponse);

        res.status(200).json({ message: formattedResponse });
    } catch (err) {
        console.error("Chatbot Error:", err);
        res.status(500).json({ message: "Failed to get first aid advice" });
    }
};