require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// **Register User**
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login page
app.get("/loginPage", async (req, res) => {
  res.render( "login");
});

// **Login User**
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// register page
app.get("/registerPage", async (req, res) => {
  res.render("register");  
});

// dashboard
app.get("/dashboard", async (req, res) => {
  res.render( "dashboard");
});
// Start Server
app.listen(process.env.PORT, () => console.log(`✅ Server running on port ${process.env.PORT}`));
