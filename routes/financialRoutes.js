// routes/financialRoutes.js
const express = require('express');
const router = express.Router();
const { createFinancialRecord, getFinancialRecords } = require('../controllers/financialController');

router.post('/', createFinancialRecord);
router.get('/', getFinancialRecords);

module.exports = router;
