// routes/channelRoutes.js
const express = require('express');
const router = express.Router();
const { getChannelDashboard } = require('../controllers/channelController');
const auth = require('../middleware/auth');

// Endpoint para obter o dashboard do canal
router.get('/dashboard', auth, getChannelDashboard);

module.exports = router;
