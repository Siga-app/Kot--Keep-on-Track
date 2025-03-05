// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configuração do middleware
app.use(bodyParser.json());
app.use(cors());

// Importando as rotas existentes
const authRoutes = require('./routes/authRoutes');
const financialRoutes = require('./routes/financialRoutes');
const channelRoutes = require('./routes/channelRoutes');

// Importando a rota de migração
const dbRoutes = require('./routes/dbRoutes');

// Configurando as rotas
app.use('/api/auth', authRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/channels', channelRoutes);

// Rota de migração (para criar a tabela sem terminal)
app.use('/api/db', dbRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
