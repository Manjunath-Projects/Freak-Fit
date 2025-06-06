const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Routes
app.get('/ping', (req, res) => {
  res.send('pong');
});


// Register
app.post('/api/register', async (req, res) => {
  try {
    console.log("🔧 Received register request");
    console.log("➡️  Body:", req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      console.log("⛔ Missing username or password");
      return res.status(400).json({ error: 'Username and password required' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();

    console.log("✅ User registered:", username);
    res.json({ message: 'User registered' });
  } catch (err) {
    console.error("🔥 Registration error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
