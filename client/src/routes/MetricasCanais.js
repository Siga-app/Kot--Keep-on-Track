import React, { useState, useEffect } from 'react';

function MetricasCanais() {
  const [canais, setCanais] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    plataforma: 'YouTube',
    url: ''
  });

  useEffect(() => {
    // Dados simulados iniciais
    const canaisSimulados = [
      {
        id: 1,
        nome: 'Canal Exemplo YouTube',
        plataforma: 'YouTube',
        metrics: {
          ultimoVideo: 'Vídeo Exemplo',
          viewsDiarias: 1000,
          viewsMes: 30000,
          viewsTotais: 500000,
          inscritosDiarios: 50,
          inscritosMes: 1500,
          totalInscritos: 200000
        }
      },
      {
        id: 2,
        nome: 'Perfil Exemplo Instagram',
        plataforma: 'Instagram',
        metrics: {
          ultimaPostagem: 'Post Exemplo',
          seguidoresAtuais: 5000,
          crescimentoDiario: 20,
          totalSeguidores: 5500
        }
      }
    ];
    setCanais(canaisSimulados);
  }, []);

  const handleInputChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleAddChannel = (e) => {
    e.preventDefault();
    if (canais.length >= 2) {
      alert("Você pode cadastrar apenas 2 canais no plano gratuito.");
      return;
    }
    const novoCanal = {
      id: Math.floor(Math.random() * 10000),
      nome: form.nome,
      plataforma: form.plataforma,
      url: form.url,
      metrics: {} // Inicialmente vazio; será atualizado com dados reais
    };
    setCanais([...canais, novoCanal]);
    setForm({ nome: '', plataforma: 'YouTube', url: '' });
    alert("Canal adicionado!");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Gestão de Mídias</h2>
      <p>Adicione e gerencie os canais das suas redes. Você pode cadastrar até 2 canais gratuitamente.</p>

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
          <label>URL do Canal:</label><br />
          <input type="text" name="url" value={form.url} onChange={handleInputChange} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Adicionar Canal</button>
      </form>

      {canais.length === 0 ? (
        <p>Nenhum canal cadastrado.</p>
      ) : (
        canais.map(canal => (
          <div key={canal.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <img src="https://via.placeholder.com/80" alt="Miniatura do Canal" style={{ marginRight: '15px', borderRadius: '5px' }} />
            <div>
              <h3>{canal.nome} ({canal.plataforma})</h3>
              {canal.plataforma === 'YouTube' && canal.metrics ? (
                <div>
                  <p>Último vídeo postado: {canal.metrics.ultimoVideo || "N/A"}</p>
                  <p>Views diárias: {canal.metrics.viewsDiarias || "N/A"}</p>
                  <p>Views do mês: {canal.metrics.viewsMes || "N/A"}</p>
                  <p>Views totais: {canal.metrics.viewsTotais || "N/A"}</p>
                  <p>Inscritos diários: {canal.metrics.inscritosDiarios || "N/A"}</p>
                  <p>Inscritos no mês: {canal.metrics.inscritosMes || "N/A"}</p>
                  <p>Total de inscritos: {canal.metrics.totalInscritos || "N/A"}</p>
                </div>
              ) : canal.plataforma === 'Instagram' && canal.metrics ? (
                <div>
                  <p>Última postagem: {canal.metrics.ultimaPostagem || "N/A"}</p>
                  <p>Seguidores atuais: {canal.metrics.seguidoresAtuais || "N/A"}</p>
                  <p>Crescimento diário: {canal.metrics.crescimentoDiario || "N/A"}</p>
                  <p>Total de seguidores: {canal.metrics.totalSeguidores || "N/A"}</p>
                </div>
              ) : canal.plataforma === 'TikTok' && canal.metrics ? (
                <div>
                  <p>Último vídeo postado: {canal.metrics.ultimoVideo || "N/A"}</p>
                  <p>Views diárias: {canal.metrics.viewsDiarias || "N/A"}</p>
                  <p>Crescimento diário: {canal.metrics.crescimentoDiario || "N/A"}</p>
                  <p>Total de seguidores: {canal.metrics.totalSeguidores || "N/A"}</p>
                </div>
              ) : (
                <p>Métricas não disponíveis.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MetricasCanais;
