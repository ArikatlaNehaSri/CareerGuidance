const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: String, // student or counselor
  bio: String,
  company: String,
  experience: String,
  skills: String,
  linkedin: String,
  github: String,
  instagram: String,
  portfolio: String
});

module.exports = mongoose.model("User", userSchema);
