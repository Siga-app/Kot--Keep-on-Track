#!/bin/bash
# Script para criar a estrutura inicial do projeto KOT - Keep On Track

# Cria a pasta raiz e entra nela
mkdir -p kot-keep-on-track
cd kot-keep-on-track || exit

# Arquivos e pastas na raiz
touch README.md package.json .env server.js
echo "node_modules/" > .gitignore

# Criação da pasta config e arquivos
mkdir -p config
cat > config/db.js << 'EOF'
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
module.exports = pool;
EOF

cat > config/apiConfig.js << 'EOF'
// Configurações das APIs externas para YouTube, TikTok e Instagram
module.exports = {
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY,
  },
  tiktok: {
    apiKey: process.env.TIKTOK_API_KEY,
  },
  instagram: {
    apiKey: process.env.INSTAGRAM_API_KEY,
  },
};
EOF

# Pasta middleware e arquivo auth.js
mkdir -p middleware
cat > middleware/auth.js << 'EOF'
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Acesso negado');
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Token inválido');
    req.user = user;
    next();
  });
};
EOF

# Pasta models e arquivos
mkdir -p models
cat > models/User.js << 'EOF'
const pool = require('../config/db');

async function createUser(email, hashedPassword) {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};
EOF

cat > models/ChannelFinancial.js << 'EOF'
// Modelo para registros financeiros dos canais
const pool = require('../config/db');

async function createChannelFinancial(data) {
  const { channel_id, type, category, amount, description, date } = data;
  const result = await pool.query(
    `INSERT INTO channel_financials (channel_id, type, category, amount, description, date)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [channel_id, type, category, amount, description, date]
  );
  return result.rows[0];
}

async function getChannelFinancials(channel_id) {
  const result = await pool.query(
    'SELECT * FROM channel_financials WHERE channel_id = $1 ORDER BY date DESC',
    [channel_id]
  );
  return result.rows;
}

module.exports = {
  createChannelFinancial,
  getChannelFinancials,
};
EOF

cat > models/PersonalFinancial.js << 'EOF'
// Modelo para registros financeiros pessoais
const pool = require('../config/db');

async function createPersonalFinancial(data) {
  const { user_id, type, category, amount, description, date } = data;
  const result = await pool.query(
    `INSERT INTO personal_financials (user_id, type, category, amount, description, date)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user_id, type, category, amount, description, date]
  );
  return result.rows[0];
}

async function getPersonalFinancials(user_id) {
  const result = await pool.query(
    'SELECT * FROM personal_financials WHERE user_id = $1 ORDER BY date DESC',
    [user_id]
  );
  return result.rows;
}

module.exports = {
  createPersonalFinancial,
  getPersonalFinancials,
};
EOF

# Pasta controllers e arquivos
mkdir -p controllers
cat > controllers/authController.js << 'EOF'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

async function register(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar usuário');
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).send('Usuário não encontrado');
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Credenciais inválidas');
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no login');
  }
}

module.exports = {
  register,
  login,
};
EOF

cat > controllers/financialController.js << 'EOF'
async function createFinancialRecord(req, res) {
  // Implemente a lógica para criar registro financeiro
  res.send('Criar registro financeiro');
}

async function getFinancialRecords(req, res) {
  // Implemente a lógica para listar registros financeiros
  res.send('Listar registros financeiros');
}

module.exports = {
  createFinancialRecord,
  getFinancialRecords,
};
EOF

cat > controllers/channelController.js << 'EOF'
// Controlador para gerenciar canais e métricas (opcional)
async function getChannelDashboard(req, res) {
  res.send('Dashboard do canal');
}

module.exports = {
  getChannelDashboard,
};
EOF

# Pasta routes e arquivos
mkdir -p routes
cat > routes/authRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
EOF

cat > routes/financialRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { createFinancialRecord, getFinancialRecords } = require('../controllers/financialController');
const auth = require('../middleware/auth');

router.post('/', auth, createFinancialRecord);
router.get('/', auth, getFinancialRecords);

module.exports = router;
EOF

cat > routes/channelRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { getChannelDashboard } = require('../controllers/channelController');
const auth = require('../middleware/auth');

router.get('/dashboard', auth, getChannelDashboard);

module.exports = router;
EOF

cat > routes/index.js << 'EOF'
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const financialRoutes = require('./financialRoutes');
const channelRoutes = require('./channelRoutes');

router.use('/auth', authRoutes);
router.use('/financial', financialRoutes);
router.use('/channels', channelRoutes);

module.exports = router;
EOF

# Pasta services e arquivos
mkdir -p services
cat > services/integrationService.js << 'EOF'
// Serviços de integração com APIs externas (YouTube, TikTok, Instagram)
async function atualizarDados() {
  console.log('Atualizando dados das APIs externas...');
  // Implemente a integração com as APIs
}

module.exports = {
  atualizarDados,
};
EOF

cat > services/jobScheduler.js << 'EOF'
const cron = require('node-cron');
const integrationService = require('./integrationService');

cron.schedule('0 0 * * *', async () => {
  console.log('Atualizando dados das APIs externas...');
  await integrationService.atualizarDados();
});
EOF

# Pasta utils e arquivo helpers.js
mkdir -p utils
cat > utils/helpers.js << 'EOF'
// Funções auxiliares e utilitárias
module.exports = {
  formatDate: (date) => {
    // Formata a data conforme necessário
    return date;
  },
};
EOF

# Estrutura do Frontend (React)
mkdir -p client/public client/src
cat > client/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KOT - Keep On Track</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOF

mkdir -p client/src/components client/src/routes client/src/services client/src/styles client/src/utils
cat > client/src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
EOF

cat > client/src/App.js << 'EOF'
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
EOF

cat > client/src/routes/Dashboard.js << 'EOF'
import React from 'react';
function Dashboard() {
  return <h1>Dashboard</h1>;
}
export default Dashboard;
EOF

cat > client/src/routes/Login.js << 'EOF'
import React from 'react';
function Login() {
  return <h1>Login</h1>;
}
export default Login;
EOF

cat > client/src/routes/Register.js << 'EOF'
import React from 'react';
function Register() {
  return <h1>Register</h1>;
}
export default Register;
EOF

cat > client/src/components/Navbar.js << 'EOF'
import React from 'react';
function Navbar() {
  return <nav>Navbar</nav>;
}
export default Navbar;
EOF

cat > client/src/components/Sidebar.js << 'EOF'
import React from 'react';
function Sidebar() {
  return <aside>Sidebar</aside>;
}
export default Sidebar;
EOF

cat > client/src/components/FinancialCard.js << 'EOF'
import React from 'react';
function FinancialCard() {
  return <div>Financial Card</div>;
}
export default FinancialCard;
EOF

cat > client/src/components/MetricsChart.js << 'EOF'
import React from 'react';
function MetricsChart() {
  return <div>Metrics Chart</div>;
}
export default MetricsChart;
EOF

cat > client/src/components/ChannelCard.js << 'EOF'
import React from 'react';
function ChannelCard() {
  return <div>Channel Card</div>;
}
export default ChannelCard;
EOF

cat > client/src/services/api.js << 'EOF'
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});
export default api;
EOF

cat > client/src/services/auth.js << 'EOF'
import api from './api';
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};
export const register = async (email, password) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};
EOF

cat > client/src/styles/main.css << 'EOF'
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
EOF

cat > client/src/utils/helpers.js << 'EOF'
// Funções utilitárias para o frontend
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
EOF

echo "Estrutura do projeto criada com sucesso!"
