// controllers/financialController.js

async function createFinancialRecord(req, res) {
  const { type, category, amount, description, date } = req.body;
  // Simulação: atribuímos um ID aleatório para o registro
  const record = {
    id: Math.floor(Math.random() * 1000),
    type,
    category,
    amount,
    description,
    date
  };
  res.json({ record, message: "Registro financeiro criado (simulado)" });
}

async function getFinancialRecords(req, res) {
  // Dados simulados; futuramente virão do banco de dados.
  const records = [
    { id: 1, type: "expense", category: "produção", amount: 150.00, description: "Gasto com equipamento", date: "2025-03-01" },
    { id: 2, type: "revenue", category: "publicidade", amount: 300.00, description: "Receita de patrocínio", date: "2025-03-02" }
  ];
  res.json(records);
}

module.exports = { createFinancialRecord, getFinancialRecords };
