import React, { useState, useEffect } from 'react';

function GestaoFinanceira() {
  // Usando localStorage para simular persistência dos registros
  const initialRecords = JSON.parse(localStorage.getItem('records')) || [];
  const [records, setRecords] = useState(initialRecords);
  const [form, setForm] = useState({
    tipo: 'despesa',
    valor: '',
    data: '',
    descricao: '',
    categoria: ''
  });
  const [filter, setFilter] = useState({ tipo: '', categoria: '' });
  
  // Função para atualizar o localStorage sempre que records mudar
  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);
  
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoRegistro = { ...form, id: Math.floor(Math.random() * 10000) };
    setRecords([...records, novoRegistro]);
    setForm({ tipo: 'despesa', valor: '', data: '', descricao: '', categoria: '' });
    alert("Registro adicionado!");
  };

  // Filtros
  const filteredRecords = records.filter(record => {
    return (filter.tipo ? record.tipo === filter.tipo : true) &&
           (filter.categoria ? record.categoria === filter.categoria : true);
  });
  
  // Cálculos de somatória (para o mês vigente - aqui simulamos com todos os registros)
  const totalReceitas = records.filter(r => r.tipo === 'receita')
                               .reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const totalDespesas = records.filter(r => r.tipo === 'despesa')
                               .reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const saldo = totalReceitas - totalDespesas;
  
  // Categorias padrão
  const categoriasDespesas = ["Produção", "Edição", "Marketing", "Publicidade", "Equipamentos", "Aluguel de Estúdio", "Software/Serviços", "Transporte", "Alimentação", "Impostos/Taxas", "Outros"];
  const categoriasReceitas = ["Publicidade/Patrocínio", "Venda de Produtos", "Serviços/Consultoria", "Assinaturas/Memberships", "Doações", "Adsense", "Outros"];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Gestão Financeira</h2>
      <p>Registre suas receitas e despesas. As despesas serão exibidas em <span style={{ color: 'red' }}>vermelho</span> e as receitas em <span style={{ color: 'green' }}>verde</span>.</p>
      
      {/* Exibição de somatórias */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Resumo Financeiro (Mês Vigente)</h3>
        <p>Total de Receitas: <strong style={{ color: 'green' }}>R$ {totalReceitas.toFixed(2)}</strong></p>
        <p>Total de Despesas: <strong style={{ color: 'red' }}>R$ {totalDespesas.toFixed(2)}</strong></p>
        <p>Saldo: <strong>R$ {saldo.toFixed(2)}</strong></p>
      </div>

      {/* Formulário para adicionar registro */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
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
              ? categoriasDespesas.map((cat, index) => <option key={index} value={cat}>{cat}</option>)
              : categoriasReceitas.map((cat, index) => <option key={index} value={cat}>{cat}</option>)
            }
          </select>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Adicionar Registro</button>
      </form>

      {/* Filtros */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <h3>Filtros</h3>
        <div>
          <label>Tipo:</label>
          <select value={filter.tipo} onChange={(e) => setFilter({ ...filter, tipo: e.target.value })}>
            <option value="">Todos</option>
            <option value="despesa">Despesas</option>
            <option value="receita">Receitas</option>
          </select>
        </div>
        <div>
          <label>Categoria:</label>
          <select value={filter.categoria} onChange={(e) => setFilter({ ...filter, categoria: e.target.value })}>
            <option value="">Todas</option>
            {filter.tipo === 'despesa'
              ? categoriasDespesas.map((cat, index) => <option key={index} value={cat}>{cat}</option>)
              : filter.tipo === 'receita'
              ? categoriasReceitas.map((cat, index) => <option key={index} value={cat}>{cat}</option>)
              : [...categoriasDespesas, ...categoriasReceitas].map((cat, index) => <option key={index} value={cat}>{cat}</option>)
            }
          </select>
        </div>
      </div>

      {/* Exibição dos registros */}
      <div>
        <h3>Registros Financeiros</h3>
        {filteredRecords.length === 0 ? (
          <p>Nenhum registro encontrado.</p>
        ) : (
          <table border="1" cellPadding="5" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#ddd' }}>
                <th>ID</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Valor (R$)</th>
                <th>Descrição</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td style={{ color: record.tipo === 'despesa' ? 'red' : 'green' }}>{record.tipo}</td>
                  <td>{record.categoria}</td>
                  <td>{parseFloat(record.valor).toFixed(2)}</td>
                  <td>{record.descricao}</td>
                  <td>{record.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GestaoFinanceira;
