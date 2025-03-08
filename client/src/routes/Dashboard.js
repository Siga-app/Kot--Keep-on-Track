import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart as BarChartIcon, Wallet, BrainCircuit, User, Settings, LogOut } from 'lucide-react';

const monthlyBalanceData = [
  { name: 'Jan', saldo: 4000 },
  { name: 'Fev', saldo: 3000 },
  { name: 'Mar', saldo: 5000 },
  { name: 'Abr', saldo: 2780 },
  { name: 'Mai', saldo: 1890 },
  { name: 'Jun', saldo: 2390 },
];

const youtubeGrowthData = [
  { name: 'Jan', inscritos: 1000, visualizacoes: 15000 },
  { name: 'Fev', inscritos: 1200, visualizacoes: 17500 },
  { name: 'Mar', inscritos: 1400, visualizacoes: 21000 },
  { name: 'Abr', inscritos: 1750, visualizacoes: 24000 },
  { name: 'Mai', inscritos: 2100, visualizacoes: 28000 },
  { name: 'Jun', inscritos: 2400, visualizacoes: 32000 },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const totalRevenue = 12500;
  const totalExpenses = 7800;
  const totalBalance = totalRevenue - totalExpenses;

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-20 bg-blue-600 text-white flex flex-col items-center py-8">
        <div className="font-bold text-xl mb-8">KOT</div>
        <nav className="flex flex-col items-center space-y-8">
          <button onClick={() => handleNavigation('dashboard')} className={`p-3 rounded-lg ${activeSection === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'}`} title="Dashboard">
            <BarChartIcon size={24} />
          </button>
          <button onClick={() => handleNavigation('finance')} className={`p-3 rounded-lg ${activeSection === 'finance' ? 'bg-blue-700' : 'hover:bg-blue-700'}`} title="Gestão Financeira">
            <Wallet size={24} />
          </button>
          <button onClick={() => handleNavigation('media')} className={`p-3 rounded-lg ${activeSection === 'media' ? 'bg-blue-700' : 'hover:bg-blue-700'}`} title="Gestão de Mídias">
            <BarChartIcon size={24} />
          </button>
          <button onClick={() => handleNavigation('kothub')} className={`p-3 rounded-lg ${activeSection === 'kothub' ? 'bg-blue-700' : 'hover:bg-blue-700'}`} title="KOT Hub">
            <BrainCircuit size={24} />
          </button>
        </nav>
        <div className="mt-auto flex flex-col items-center space-y-4">
          <button onClick={() => handleNavigation('profile')} className="p-3 rounded-lg hover:bg-blue-700" title="Perfil">
            <User size={24} />
          </button>
          <button onClick={() => handleNavigation('settings')} className="p-3 rounded-lg hover:bg-blue-700" title="Configurações">
            <Settings size={24} />
          </button>
          <button className="p-3 rounded-lg hover:bg-blue-700" title="Sair">
            <LogOut size={24} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input type="text" placeholder="Pesquisar..." className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  US
                </div>
                <span className="font-medium">Usuário</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 font-medium">Receita Total</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">R$ {totalRevenue.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 font-medium">Despesas Totais</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">R$ {totalExpenses.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 font-medium">Saldo Total</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">R$ {totalBalance.toLocaleString('pt-BR')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Saldo Mensal</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyBalanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="saldo" stroke="#007bff" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Crescimento YouTube</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={youtubeGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="inscritos" fill="#007bff" />
                    <Bar yAxisId="right" dataKey="visualizacoes" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button onClick={() => handleNavigation('finance')} className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-blue-100 mb-4">
                  <Wallet className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Gestão Financeira</h3>
                <p className="text-gray-500 text-center mt-2">Gerencie suas receitas e despesas</p>
              </div>
            </button>
            <button onClick={() => handleNavigation('media')} className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-blue-100 mb-4">
                  <BarChartIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Gestão de Mídias</h3>
                <p className="text-gray-500 text-center mt-2">Acompanhe as métricas dos seus canais</p>
              </div>
            </button>
            <button onClick={() => handleNavigation('kothub')} className="bg-white rounded-lg shadow p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-blue-100 mb-4">
                  <BrainCircuit className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">KOT Hub</h3>
                <p className="text-gray-500 text-center mt-2">Assistente virtual e gestão de tarefas</p>
              </div>
            </button>
          </div>
          {activeSection === 'kothub' && (
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Kot Hub</h3>
              <p className="text-gray-600">
                Esta é a área interativa para organizar tarefas, planejar ações e receber sugestões do Assistente Virtual Kot.
              </p>
              {/* Aqui você poderá integrar o componente KotHub, se desejar */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
