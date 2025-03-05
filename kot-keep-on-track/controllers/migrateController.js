// migrateController.js
const pool = require('../config/db');

async function migrate(req, res) {
  try {
    // Aqui estamos criando a tabela "users" diretamente pelo código.
    // Se ela já existir, não haverá problema, pois usamos IF NOT EXISTS.
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    res.send('Tabela "users" criada com sucesso (se não existia)!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar tabela: ' + error.message);
  }
}

module.exports = { migrate };
