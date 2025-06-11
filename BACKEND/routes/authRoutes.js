const express = require('express');
const { register, login } = require('../Controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Your JWT middleware
const router = express.Router();

router.post('/register', register);
router.post('/login', login);


// Protected route to get current user
// router.get('/me', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password'); // exclude password
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

const User = require('../models/User');

// routes/authRoutes.js
router.get('/me', authMiddleware, async (req, res) => {
  try {
    console.log("📥 /me route hit");
    
    // Log incoming user from middleware
    console.log("req.user:", req.user);

    if (!req.user || !req.user.id) {
      console.log("❌ req.user or req.user.id is missing");
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("✅ User fetched successfully:", user);
    res.json(user);

  } catch (err) {
    console.error("💥 Critical error fetching /me:", err); // 👈 This tells us everything!
    res.status(500).json({ error: 'Server error. Check logs.' });
  }
});


module.exports = router;



// routes/authRouter.js
// const express = require('express');
// const { register, login } = require('../controllers/authController');
// const authMiddleware = require('../middleware/authMiddleware'); // Your JWT middleware
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// // Protected route to get current user
// router.get('/me', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password'); // exclude password
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;