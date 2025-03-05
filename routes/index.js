const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const financialRoutes = require('./financialRoutes');
const channelRoutes = require('./channelRoutes');

router.use('/auth', authRoutes);
router.use('/financial', financialRoutes);
router.use('/channels', channelRoutes);

module.exports = router;
