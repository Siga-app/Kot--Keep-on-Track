// controllers/channelController.js
async function getChannelDashboard(req, res) {
  // Simulação de dados do dashboard do canal.
  // Em uma implementação real, você buscará os dados do banco e das APIs integradas.
  const dashboardData = {
    channelId: req.query.channelId || 1,
    views: 12345,
    subscribers: 678,
    bestVideo: {
      title: "Vídeo Exemplo",
      views: 2345,
    },
    revenue: 1500.00,
  };
  res.json(dashboardData);
}

module.exports = {
  getChannelDashboard,
};
