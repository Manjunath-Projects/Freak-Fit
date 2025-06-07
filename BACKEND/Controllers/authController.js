const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or data invalid' });
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
