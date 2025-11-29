const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ========== REGISTER ==========
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, message: "User registered" });
  } catch (err) {
    res.json({ success: false, message: "Email already exists" });
  }
});

// ========== LOGIN ==========
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  res.json({ success: true, user });
});

// ========== UPDATE PROFILE ==========
app.put("/update-profile/:email", async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { email: req.params.email },
    req.body,
    { new: true }
  );

  res.json({ success: true, user: updatedUser });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log("Backend running on port " + process.env.PORT);
});
