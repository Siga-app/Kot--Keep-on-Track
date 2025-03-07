import React, { useState } from 'react';

function Configuracoes() {
  const [user] = useState({
    nome: 'Usuário Exemplo',
    email: 'usuario@example.com',
    foto: 'https://via.placeholder.com/150'
  });
  const [notificacoes, setNotificacoes] = useState(true);
  const [idioma, setIdioma] = useState('pt-BR');
  const [moeda, setMoeda] = useState('BRL');

  const handleLogout = () => {
    alert("Logout realizado!");
    // Redirecione para a página de login, se necessário.
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Configurações / Perfil</h2>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Perfil do Usuário</h3>
        <img src={user.foto} alt="Foto de perfil" style={{ width: '150px', height: '150px', borderRadius: '50%' }} /><br/>
        <p>Nome: {user.nome}</p>
        <p>Email: {user.email}</p>
        <button onClick={() => alert("Função de editar perfil ainda não implementada")}>Editar Perfil</button>
      </div>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Configurações Gerais</h3>
        <div>
          <label>
            Notificações por email:
            <input type="checkbox" checked={notificacoes} onChange={() => setNotificacoes(!notificacoes)} />
          </label>
        </div>
        <div>
          <label>Idioma:</label>
          <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">Inglês (EUA)</option>
          </select>
        </div>
        <div>
          <label>Moeda:</label>
          <select value={moeda} onChange={(e) => setMoeda(e.target.value)}>
            <option value="BRL">Real (R$)</option>
            <option value="USD">Dólar (US$)</option>
          </select>
        </div>
      </div>
      
      <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
        Sair
      </button>
    </div>
  );
}

export default Configuracoes;
