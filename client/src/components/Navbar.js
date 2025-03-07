import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>Início</Link>
        <Link to="/dashboard" style={{ color: '#fff', marginRight: '15px' }}>Dashboard</Link>
        <Link to="/gestao-financeira" style={{ color: '#fff', marginRight: '15px' }}>Gestão Financeira</Link>
        <Link to="/metricas-canais" style={{ color: '#fff', marginRight: '15px' }}>Métricas de Canais</Link>
      </div>
      <div>
        {token ? (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setDropdown(!dropdown)}>
              Olá, Usuário
            </span>
            {dropdown && (
              <div style={{ position: 'absolute', right: 0, backgroundColor: '#fff', color: '#000', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                <Link to="/configuracoes" style={{ display: 'block', marginBottom: '5px' }}>Configurações</Link>
                <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px' }}>
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', marginRight: '15px' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff' }}>Registrar</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
