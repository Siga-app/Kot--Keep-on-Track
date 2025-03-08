// client/src/routes/MetricasCanais.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MetricasCanais() {
  // Chave do YouTube (inserida diretamente; em produção, use variáveis de ambiente)
  const YOUTUBE_API_KEY = 'AIzaSyDv440NFn-7yKjCuMJRmikDSrXLOaCX7ww';

  // Estado para armazenar os canais cadastrados
  const [canais, setCanais] = useState([]);
  // Estado para o formulário de adição de canal
  const [form, setForm] = useState({
    nome: '',
    plataforma: 'YouTube',
    link: ''  // Campo para inserir o link completo do canal
  });

  // Função para extrair o ID do canal a partir do link completo
  const extractChannelId = (input) => {
    // Procura pelo padrão "/channel/ID"
    const channelRegex = /channel\/([a-zA-Z0-9_-]+)/;
    const match = input.match(channelRegex);
    if (match && match[1]) {
      return match[1];
    }
    // Se não encontrar, assume que o input já é o ID
    return input;
  };

  // Carregamos dados simulados iniciais (você pode remover ou manter)
  useEffect(() => {
    const canaisSimulados = [
      {
        id: 1,
        nome: 'Canal Exemplo YouTube',
        plataforma: 'YouTube',
        channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
        metrics: {
          ultimoVideo: 'Vídeo Exemplo',
          viewsDiarias: 1000,
          viewsMes: 30000,
          viewsTotais: 450000,
          inscritosDiarios: 50,
          inscritosMes: 1500,
          totalInscritos: 200000
        }
      }
    ];
    setCanais(canaisSimulados);
  }, []);

  // Função para lidar com a alteração dos inputs
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função que busca métricas do YouTube usando a API
  const fetchYouTubeMetrics = async (channelId) => {
    try {
      const channelRes = await axios.get(
        'https://www.googleapis.com/youtube/v3/channels',
        {
          params: {
            part: 'snippet,statistics',
            id: channelId,
            key: YOUTUBE_API_KEY
          }
        }
      );
      const channelData = channelRes.data.items[0];

      const videoRes = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            channelId: channelId,
            maxResults: 1,
            order: 'date',
            type: 'video',
            key: YOUTUBE_API_KEY
          }
        }
      );
      const lastVideo = videoRes.data.items[0];

      if (!channelData) {
        return { erro: 'Canal não encontrado.' };
      }

      const metrics = {
        ultimoVideo: lastVideo ? lastVideo.snippet.title : 'N/A',
        viewsDiarias: 'N/A',
        viewsMes: 'N/A',
        viewsTotais: channelData.statistics.viewCount || '0',
        inscritosDiarios: 'N/A',
        inscritosMes: 'N/A',
        totalInscritos: channelData.statistics.subscriberCount || '0'
      };
      return metrics;
    } catch (error) {
      console.error("Erro ao buscar métricas do YouTube:", error);
      return { erro: "Erro ao buscar dados reais do YouTube." };
    }
  };

  // Função para adicionar um canal
  const handleAddChannel = async (e) => {
    e.preventDefault();
    if (canais.length >= 2) {
      alert("Você pode cadastrar apenas 2 canais no plano gratuito.");
      return;
    }
    // Extrair o ID do canal a partir do link informado
    const channelId = extractChannelId(form.link);
    let novoCanal = {
      id: Math.floor(Math.random() * 100000),
      nome: form.nome,
      plataforma: form.plataforma,
      channelId: channelId,
      metrics: {}
    };

    if (form.plataforma === 'YouTube') {
      const result = await fetchYouTubeMetrics(channelId);
      novoCanal.metrics = result;
    } else {
      novoCanal.metrics = { mensagem: "Métricas não implementadas para esta plataforma." };
    }
    setCanais([...canais, novoCanal]);
    setForm({ nome: '', plataforma: 'YouTube', link: '' });
    alert("Canal adicionado com sucesso!");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Gestão de Mídias</h2>
      <p>Adicione e gerencie os canais das suas redes. No plano gratuito, você pode cadastrar até 2 canais. Para YouTube, insira o link completo do canal (o sistema extrairá o ID automaticamente).</p>

      {/* Formulário de Adição de Canal */}
      <form onSubmit={handleAddChannel} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h3>Adicionar Canal</h3>
        <div>
          <label>Nome do Canal:</label><br />
          <input type="text" name="nome" value={form.nome} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Plataforma:</label><br />
          <select name="plataforma" value={form.plataforma} onChange={handleInputChange}>
            <option value="YouTube">YouTube</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
          </select>
        </div>
        <div>
          <label>Link do Canal (para YouTube):</label><br />
          <input type="text" name="link" value={form.link} onChange={handleInputChange} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Adicionar Canal</button>
      </form>

      {canais.length === 0 ? (
        <p>Nenhum canal cadastrado.</p>
      ) : (
        canais.map(canal => (
          <div key={canal.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <img src="https://via.placeholder.com/80" alt="Miniatura do Canal" style={{ marginRight: '15px', borderRadius: '5px' }} />
            <div>
              <h3>{canal.nome} ({canal.plataforma})</h3>
              {canal.plataforma === 'YouTube' ? (
                canal.metrics.erro ? (
                  <p style={{ color: 'red' }}>Erro: {canal.metrics.erro}</p>
                ) : canal.metrics.mensagem ? (
                  <p>{canal.metrics.mensagem}</p>
                ) : (
                  <div>
                    <p>Último vídeo postado: {canal.metrics.ultimoVideo || "N/A"}</p>
                    <p>Views Diárias: {canal.metrics.viewsDiarias}</p>
                    <p>Views do Mês: {canal.metrics.viewsMes}</p>
                    <p>Views Totais: {canal.metrics.viewsTotais}</p>
                    <p>Inscritos Diários: {canal.metrics.inscritosDiarios}</p>
                    <p>Inscritos no Mês: {canal.metrics.inscritosMes}</p>
                    <p>Total de Inscritos: {canal.metrics.totalInscritos}</p>
                  </div>
                )
              ) : (
                <div>
                  <p>{canal.metrics.mensagem || "Métricas não disponíveis para esta plataforma."}</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MetricasCanais;
