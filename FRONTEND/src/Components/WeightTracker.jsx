import React, { useState } from 'react';
import '../App.css';
import { motion, AnimatePresence } from 'framer-motion';

const WeightTracker = () => {
  const [weights, setWeights] = useState(Array(30).fill(''));
  const [currentWeight, setCurrentWeight] = useState('');

  const handleChange = (index, value) => {
    const updated = [...weights];
    updated[index] = value;
    setWeights(updated);
  };

  const calculateWeightChange = () => {
    const filledWeights = weights.filter(w => w !== '').map(Number);
    if (filledWeights.length === 0) return null;

    const initialWeight = filledWeights[0];
    const latestWeight = filledWeights[filledWeights.length - 1];

    const weightChange = latestWeight - initialWeight;
    return weightChange;
  };

  const clearAll = () => {
    setWeights(Array(30).fill(''));
    setCurrentWeight('');
  };

  const weightChange = calculateWeightChange();

  return (
    <motion.div className="weight-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <motion.div className="header" initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 70 }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>📉 MONTHLY WEIGHT TRACKER</span>
      </motion.div>

      <div className="weight-container">
        <motion.div className="goal-input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <label>Enter Your Current Weight (kg):</label>
          <input
            type="number"
            value={currentWeight}
            onChange={e => setCurrentWeight(e.target.value)}
            placeholder="e.g. 68"
          />
        </motion.div>

        <motion.div className="calendar-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {weights.map((weight, idx) => (
            <motion.div
              key={idx}
              className="weight-entry"
              whileHover={{ scale: 1.05 }}
              style={{ background: '#1e1e1e', padding: '1rem', borderRadius: '0.5rem' }}
            >
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Day {idx + 1}</strong>
              <input
                type="number"
                value={weight}
                onChange={e => handleChange(idx, e.target.value)}
                placeholder="Weight (kg)"
              />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {weightChange !== null && (
            <motion.div
              className="summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 style={{ color: weightChange < 0 ? '#4caf50' : '#ff4d4d' }}>
                🎯 You've {weightChange < 0 ? 'lost' : 'gained'} {Math.abs(weightChange)} kg this month
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '2rem' }}
        >
          <button onClick={clearAll} style={{ backgroundColor: '#4dc3ff', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none' }}>
            Clear All
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeightTracker;
