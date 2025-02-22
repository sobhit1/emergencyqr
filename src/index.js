const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/qr", require("./routes/qrRoutes"));
app.use("/api/sos", require("./routes/sosRoutes"));
app.use("/api/voice", require("./routes/voiceRoutes"));
app.use("/api/chatbot", require("./routes/chatbotRoutes"));

app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});

module.exports = (req, res) => {
    return app(req, res);
};