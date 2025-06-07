const express = require('express');
const { getDashboardData, updateProfile } = require('../Controllers/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getDashboardData);
router.put('/profile', auth, updateProfile);

module.exports = router;
