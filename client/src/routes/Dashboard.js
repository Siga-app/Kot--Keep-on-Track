import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('https://kot-keep-on-track.onrender.com/api/financial')
      .then(response => setRecords(response.data))
      .catch(error => console.error('Erro ao buscar registros:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <h3>Registros Financeiros</h3>
      {records.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <ul>
          {records.map(record => (
            <li key={record.id}>
              {record.type} - {record.category}: R$ {record.amount} - {record.description} ({record.date})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
