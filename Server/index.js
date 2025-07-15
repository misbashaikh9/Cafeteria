const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/Customer');

const app = express();
app.use(express.json());
app.use(cors());

// 🔌 MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Cafeteria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 🚀 Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const newUser = await userModel.create({ name, email, password });

    return res.status(201).json({ message: "Signup successful", user: newUser });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 🔐 Signin Route
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    return res.status(200).send("Success"); // Frontend depends on this string

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 🚨 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start Server
app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
