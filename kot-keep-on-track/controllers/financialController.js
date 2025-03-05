async function createFinancialRecord(req, res) {
  // Implemente a lógica para criar registro financeiro
  res.send('Criar registro financeiro');
}

async function getFinancialRecords(req, res) {
  // Implemente a lógica para listar registros financeiros
  res.send('Listar registros financeiros');
}

module.exports = {
  createFinancialRecord,
  getFinancialRecords,
};
