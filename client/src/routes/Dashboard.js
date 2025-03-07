import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [financialSummary, setFinancialSummary] = useState({
    totalReceitas: 0,
    totalDespesas: 0,
    saldo: 0
  });
  
  const [channelMetrics, setChannelMetrics] = useState({
    youtube: { totalInscritos: 'N/A' },
    instagram: { totalSeguidores: 'N/A' },
    tiktok: { totalSeguidores: 'N/A' }
  });
  
  useEffect(() => {
    // Chamadas simuladas para endpoints; substitua por chamadas reais quando disponíveis.
    axios.get('https://kot-keep-on-track.onrender.com/api/financial/summary')
      .then(response => {
        setFinancialSummary(response.data);
      })
      .catch(err => console.error('Erro ao buscar resumo financeiro:', err));
      
    axios.get('https://kot-keep-on-track.onrender.com/api/channels/metrics')
      .then(response => {
        setChannelMetrics(response.data);
      })
      .catch(err => console.error('Erro ao buscar métricas de canais:', err));
  }, []);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
          <h3>Resumo Financeiro</h3>
          <p>Total de Receitas: R$ {financialSummary.totalReceitas}</p>
          <p>Total de Despesas: R$ {financialSummary.totalDespesas}</p>
          <p>Saldo: R$ {financialSummary.saldo}</p>
        </div>
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
          <h3>Métricas de Canais</h3>
          <p>YouTube - Inscritos Totais: {channelMetrics.youtube.totalInscritos}</p>
          <p>Instagram - Seguidores Totais: {channelMetrics.instagram.totalSeguidores}</p>
          <p>TikTok - Seguidores Totais: {channelMetrics.tiktok.totalSeguidores}</p>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h3>Gráfico de Evolução</h3>
        <p>(Gráfico de linhas simulando evolução do saldo nos últimos meses)</p>
      </div>
      
      <div>
        <h3>Acessos Rápidos</h3>
        <Link to="/gestao-financeira" style={{ marginRight: '15px' }}>
          Gestão Financeira
        </Link>
        <Link to="/metricas-canais">
          Métricas de Canais
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
