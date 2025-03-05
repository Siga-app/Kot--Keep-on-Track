const express = require('express');
const router = express.Router();
const { createFinancialRecord, getFinancialRecords } = require('../controllers/financialController');
const auth = require('../middleware/auth');

router.post('/', auth, createFinancialRecord);
router.get('/', auth, getFinancialRecords);

module.exports = router;
