// services/jobScheduler.js
const cron = require('node-cron');
const integrationService = require('./integrationService');

// Agendar job para atualizar os dados das APIs externas a cada 24 horas
cron.schedule('0 0 * * *', async () => {
  console.log('Executando job agendado: Atualizando dados das APIs externas...');
  await integrationService.atualizarDados();
});
