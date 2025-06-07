const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  steps: Number,
  waterIntake: Number,
  calories: Number,
  heartRate: Number
});

module.exports = mongoose.model('Activity', ActivitySchema);
