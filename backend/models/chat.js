const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: String,        // student or counsellor email
  receiver: String,      // opposite person email
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Chat", ChatSchema);
