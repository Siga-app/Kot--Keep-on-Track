// client/src/routes/Dashboard.js
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
    youtube: { ultimoVideo: "N/A", viewsDiarias: 0, viewsMes: 0, viewsTotais: 0, inscritosDiarios: 0, inscritosMes: 0, totalInscritos: 0 },
    instagram: { ultimaPostagem: "N/A", seguidoresAtuais: 0, crescimentoDiario: 0, totalSeguidores: 0 },
    tiktok: { ultimoVideo: "N/A", viewsDiarias: 0, crescimentoDiario: 0, totalSeguidores: 0 }
  });

  useEffect(() => {
    // Chamadas simuladas para endpoints - substitua por chamadas reais futuramente.
    axios.get('https://kot-keep-on-track.onrender.com/api/financial/summary')
      .then(response => setFinancialSummary(response.data))
      .catch(err => console.error('Erro ao buscar resumo financeiro:', err));
      
    axios.get('https://kot-keep-on-track.onrender.com/api/channels/metrics')
      .then(response => setChannelMetrics(response.data))
      .catch(err => console.error('Erro ao buscar métricas de canais:', err));
  }, []);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Dashboard</h2>
      <p style={{ color: '#555' }}>Aqui você visualiza um resumo geral de suas finanças e desempenho dos canais.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* Resumo Financeiro */}
        <div style={{ flex: 1, backgroundColor: '#e0f0ff', padding: '15px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#007bff' }}>Resumo Financeiro</h3>
          <p>Total de Receitas: <strong>R$ {financialSummary.totalReceitas}</strong></p>
          <p>Total de Despesas: <strong>R$ {financialSummary.totalDespesas}</strong></p>
          <p>Saldo: <strong>R$ {financialSummary.saldo}</strong></p>
        </div>
        
        {/* Métricas de Canais */}
        <div style={{ flex: 1, backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#333' }}>Métricas de Canais</h3>
          <p>YouTube - Último vídeo: {channelMetrics.youtube.ultimoVideo}</p>
          <p>Views Diárias: {channelMetrics.youtube.viewsDiarias}</p>
          <p>Views do Mês: {channelMetrics.youtube.viewsMes}</p>
          <p>Views Totais: {channelMetrics.youtube.viewsTotais}</p>
          <p>Inscritos Diários: {channelMetrics.youtube.inscritosDiarios}</p>
          <p>Inscritos no Mês: {channelMetrics.youtube.inscritosMes}</p>
          <p>Total de Inscritos: {channelMetrics.youtube.totalInscritos}</p>
        </div>
      </div>
      
      {/* Gráfico Simulado */}
      <div style={{ marginBottom: '20px', backgroundColor: '#fff', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <h3 style={{ color: '#007bff' }}>Gráfico de Evolução</h3>
        <p>(Gráfico de linhas simulando a evolução do saldo)</p>
      </div>
      
      {/* Atalhos Rápidos */}
      <div>
        <h3>Acessos Rápidos</h3>
        <Link to="/gestao-financeira" style={{ marginRight: '20px', padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
          Gestão Financeira
        </Link>
        <Link to="/metricas-canais" style={{ padding: '8px 16px', backgroundColor: '#17a2b8', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
          Gestão de Mídias
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
