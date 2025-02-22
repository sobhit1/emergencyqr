const User = require("../models/User");

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateFields = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
            new: true,
            runValidators: true
        }).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error("❌ Profile Update Error:", err);
        res.status(500).json({ message: "Failed to update profile" });
    }
};