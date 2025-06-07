const express = require('express');
const { addActivity, getActivities } = require('../controllers/activityController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.use(auth); // ✅ Protect all routes below

router.get('/', getActivities);
router.post('/', addActivity);

module.exports = router;
