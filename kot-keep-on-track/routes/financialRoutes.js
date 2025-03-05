// routes/financialRoutes.js
const express = require('express');
const router = express.Router();
const { createFinancialRecord, getFinancialRecords } = require('../controllers/financialController');
const auth = require('../middleware/auth');

// Endpoint para criar um registro financeiro
router.post('/', auth, createFinancialRecord);

// Endpoint para listar registros financeiros
router.get('/', auth, getFinancialRecords);

module.exports = router;
