const express = require("express");
const { register, login, getProfile } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const { updateUserProfile } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me/:id", getProfile);

router.put("/update", authMiddleware, updateUserProfile);

module.exports = router;