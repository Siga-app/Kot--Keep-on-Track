import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://kot-keep-on-track.onrender.com/api/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('nome', response.data.nome || 'Usuário');
        alert('Login realizado com sucesso!');
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Erro no login:', error);
        alert('Erro no login');
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
