// Modelo para registros financeiros dos canais
const pool = require('../config/db');

async function createChannelFinancial(data) {
  const { channel_id, type, category, amount, description, date } = data;
  const result = await pool.query(
    `INSERT INTO channel_financials (channel_id, type, category, amount, description, date)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [channel_id, type, category, amount, description, date]
  );
  return result.rows[0];
}

async function getChannelFinancials(channel_id) {
  const result = await pool.query(
    'SELECT * FROM channel_financials WHERE channel_id = $1 ORDER BY date DESC',
    [channel_id]
  );
  return result.rows;
}

module.exports = {
  createChannelFinancial,
  getChannelFinancials,
};
