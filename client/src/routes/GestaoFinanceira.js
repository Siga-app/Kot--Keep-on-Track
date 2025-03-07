import React, { useState, useEffect } from 'react';

function GestaoFinanceira() {
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState({
    despesas: ["Produção", "Edição", "Marketing", "Publicidade", "Equipamentos", "Aluguel de Estúdio", "Software/Serviços", "Transporte", "Alimentação", "Impostos/Taxas", "Outros"],
    receitas: ["Publicidade/Patrocínio", "Venda de Produtos", "Serviços/Consultoria", "Assinaturas/Memberships", "Doações", "Outros"]
  });
  const [form, setForm] = useState({
    tipo: 'despesa',
    valor: '',
    data: '',
    descricao: '',
    categoria: ''
  });

  useEffect(() => {
    // Dados simulados iniciais
    const dadosSimulados = [
      { id: 1, tipo: "despesa", categoria: "Produção", valor: 150.00, descricao: "Gasto com equipamento", data: "2025-03-01" },
      { id: 2, tipo: "receita", categoria: "Publicidade/Patrocínio", valor: 300.00, descricao: "Receita de patrocínio", data: "2025-03-02" }
    ];
    setRecords(dadosSimulados);
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoRegistro = { ...form, id: Math.floor(Math.random() * 10000) };
    setRecords([...records, novoRegistro]);
    setForm({ tipo: 'despesa', valor: '', data: '', descricao: '', categoria: '' });
    alert("Registro adicionado (simulado)!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestão Financeira</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
        <h3>Adicionar Registro</h3>
        <div>
          <label>Tipo:</label>
          <select name="tipo" value={form.tipo} onChange={handleInputChange}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </div>
        <div>
          <label>Valor (R$):</label>
          <input type="number" step="0.01" name="valor" value={form.valor} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Data:</label>
          <input type="date" name="data" value={form.data} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" name="descricao" value={form.descricao} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Categoria:</label>
          <select name="categoria" value={form.categoria} onChange={handleInputChange} required>
            <option value="">Selecione uma categoria</option>
            {form.tipo === 'despesa'
              ? categories.despesas.map((cat, index) => <option key={index} value={cat}>{cat}</option>)
              : categories.receitas.map((cat, index) => <option key={index} value={cat}>{cat}</option>)
            }
          </select>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Adicionar Registro</button>
      </form>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Registros Financeiros</h3>
        {records.length === 0 ? (
          <p>Nenhum registro encontrado.</p>
        ) : (
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Valor (R$)</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.tipo}</td>
                  <td>{record.categoria}</td>
                  <td>{record.valor}</td>
                  <td>{record.descricao}</td>
                  <td>{record.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h3>Gráfico de Evolução (Simulado)</h3>
        <p>(Aqui será exibido um gráfico de linhas ou barras mostrando a evolução de receitas e despesas)</p>
      </div>
    </div>
  );
}

export default GestaoFinanceira;
