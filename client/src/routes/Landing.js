import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#f5f5f5'
    }}>
      <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>KOT – Keep On Track</h1>
      <p style={{ fontSize: '1.2em', maxWidth: '600px', textAlign: 'center', marginBottom: '2em' }}>
        Somos um sistema inovador que ajuda criadores de conteúdo a controlar suas finanças e acompanhar o desempenho dos seus canais de forma simples e profissional.
      </p>
      <div>
        <Link to="/login" style={{
          padding: '10px 20px',
          marginRight: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Login
        </Link>
        <Link to="/register" style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Registrar
        </Link>
      </div>
    </div>
  );
}

export default Landing;
