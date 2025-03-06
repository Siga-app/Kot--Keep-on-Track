import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://kot-keep-on-track.onrender.com/api/auth/register', { email, password })
      .then(response => {
        alert('Registro realizado com sucesso!');
        navigate('/login');
      })
      .catch(error => {
        console.error('Erro no registro:', error);
        alert('Erro no registro');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br/>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label><br/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
