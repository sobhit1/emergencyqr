const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  emergencyContacts: [
    {
      name: { type: String},
      phone: { type: String},
    },
  ],
  bloodType: { type: String },
  medicalHistory: { type: String },
  qrCode: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);