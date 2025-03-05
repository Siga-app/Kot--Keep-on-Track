const express = require('express');
const router = express.Router();
const { getChannelDashboard } = require('../controllers/channelController');
const auth = require('../middleware/auth');

router.get('/dashboard', auth, getChannelDashboard);

module.exports = router;
