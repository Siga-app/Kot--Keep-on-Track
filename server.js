// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const dbRoutes = require('./routes/dbRoutes');

// Configurar rotas
app.use('/api/auth', authRoutes);
app.use('/api/db', dbRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('KOT - Keep On Track Backend Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
