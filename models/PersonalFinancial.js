// Modelo para registros financeiros pessoais
const pool = require('../config/db');

async function createPersonalFinancial(data) {
  const { user_id, type, category, amount, description, date } = data;
  const result = await pool.query(
    `INSERT INTO personal_financials (user_id, type, category, amount, description, date)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user_id, type, category, amount, description, date]
  );
  return result.rows[0];
}

async function getPersonalFinancials(user_id) {
  const result = await pool.query(
    'SELECT * FROM personal_financials WHERE user_id = $1 ORDER BY date DESC',
    [user_id]
  );
  return result.rows;
}

module.exports = {
  createPersonalFinancial,
  getPersonalFinancials,
};
