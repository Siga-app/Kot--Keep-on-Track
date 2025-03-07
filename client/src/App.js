import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './routes/Landing';
import Dashboard from './routes/Dashboard';
import GestaoFinanceira from './routes/GestaoFinanceira';
import MetricasCanais from './routes/MetricasCanais';
import Configuracoes from './routes/Configuracoes';
import Login from './routes/Login';
import Register from './routes/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gestao-financeira" element={<GestaoFinanceira />} />
        <Route path="/metricas-canais" element={<MetricasCanais />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
