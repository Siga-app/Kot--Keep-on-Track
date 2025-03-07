import React, { useState } from 'react';

function Configuracoes() {
  const [user, setUser] = useState({
    nome: 'Usuário Exemplo',
    email: 'usuario@example.com',
    foto: 'https://via.placeholder.com/150',
    cidade: 'Cidade Exemplo',
    telefone: '0000-0000'
  });
  const [notificacoes, setNotificacoes] = useState(true);
  const [idioma, setIdioma] = useState('pt-BR');
  const [moeda, setMoeda] = useState('BRL');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Perfil atualizado (simulado)!");
    // Aqui você implementaria a atualização no backend.
  };

  const handleLogout = () => {
    alert("Logout realizado!");
    // Aqui redirecione para a página de login, se necessário.
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Configurações / Perfil</h2>
      
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Editar Perfil</h3>
        <div>
          <label>Nome:</label><br/>
          <input type="text" value={user.nome} onChange={(e) => setUser({...user, nome: e.target.value})} required />
        </div>
        <div>
          <label>Email:</label><br/>
          <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required />
        </div>
        <div>
          <label>Foto (URL):</label><br/>
          <input type="text" value={user.foto} onChange={(e) => setUser({...user, foto: e.target.value})} required />
        </div>
        <div>
          <label>Cidade:</label><br/>
          <input type="text" value={user.cidade} onChange={(e) => setUser({...user, cidade: e.target.value})} />
        </div>
        <div>
          <label>Telefone:</label><br/>
          <input type="text" value={user.telefone} onChange={(e) => setUser({...user, telefone: e.target.value})} />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Salvar Alterações</button>
      </form>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
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
