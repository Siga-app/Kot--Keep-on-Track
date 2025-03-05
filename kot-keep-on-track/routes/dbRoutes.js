// dbRoutes.js
const express = require('express');
const router = express.Router();
const { migrate } = require('../controllers/migrateController');

// Rota para criar a tabela "users" (sem usar terminal)
router.get('/migrate', migrate);

module.exports = router;
