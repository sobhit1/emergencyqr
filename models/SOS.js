const mongoose = require("mongoose");

const SOSSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  location: { 
    lat: { type: String, required: true }, 
    long: { type: String, required: true } 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  resolved: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model("SOS", SOSSchema);