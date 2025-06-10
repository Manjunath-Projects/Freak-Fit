const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
    console.log("Register Request Body:", req.body); // Log incoming data

    const user = await User.create(req.body);
    const token = createToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error("Registration Error:", err); // Log detailed error

    if (err.code === 11000) {
      // MongoDB duplicate key error (e.g. email already exists)
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (err.name === 'ValidationError') {
      // Mongoose validation failed
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(', ') });
    }

    // Fallback for unexpected errors
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = createToken(user);
  res.json({ token });
};
