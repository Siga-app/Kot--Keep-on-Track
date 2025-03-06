import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '10px' }}>Dashboard</Link>
      <Link to="/login" style={{ color: '#fff', marginRight: '10px' }}>Login</Link>
      <Link to="/register" style={{ color: '#fff' }}>Registro</Link>
    </nav>
  );
}

export default Navbar;
