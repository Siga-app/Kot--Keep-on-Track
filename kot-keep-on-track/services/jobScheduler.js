const cron = require('node-cron');
const integrationService = require('./integrationService');

cron.schedule('0 0 * * *', async () => {
  console.log('Atualizando dados das APIs externas...');
  await integrationService.atualizarDados();
});
