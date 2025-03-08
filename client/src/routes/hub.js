import React, { useState } from 'react';

const KotHub = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revisar análise de métricas', status: 'A Fazer' },
    { id: 2, title: 'Planejar próxima campanha', status: 'Em Progresso' },
    { id: 3, title: 'Publicar vídeo tutorial', status: 'Concluído' },
  ]);
  const [newTask, setNewTask] = useState('');
  
  const handleAddTask = () => {
    if(newTask.trim() === '') return;
    const newTaskObj = { id: tasks.length + 1, title: newTask, status: 'A Fazer' };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Kot Hub</h2>
      <div className="mb-4">
        <input 
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Adicione uma nova tarefa..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button 
          onClick={handleAddTask}
          className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Adicionar Tarefa
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['A Fazer', 'Em Progresso', 'Concluído'].map(status => (
          <div key={status} className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">{status}</h3>
            <ul>
              {tasks.filter(task => task.status === status).map(task => (
                <li key={task.id} className="mb-2 p-2 bg-white rounded shadow">{task.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KotHub;
