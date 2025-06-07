const User = require('../models/User');
const Activity = require('../models/Activity');

exports.getDashboardData = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const activity = await Activity.find({ userId: req.user.id }).sort({ date: -1 }).limit(7);
  res.json({ user, activity });
};

exports.updateProfile = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(updated);
};
