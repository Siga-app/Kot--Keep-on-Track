import React, { useState } from 'react';
import { PlusCircle, Youtube, Instagram, Trash2, RefreshCw } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Dados iniciais dos canais
const initialChannels = [
  {
    id: 1,
    name: 'Canal Principal',
    platform: 'youtube',
    url: 'https://youtube.com/channel/xyz',
    subscribers: 12500,
    views: 450000,
    lastMonthViews: 28000,
    engagementRate: 8.2,
    growth: 5.4
  },
  {
    id: 2,
    name: 'Canal Secundário',
    platform: 'youtube',
    url: 'https://youtube.com/channel/abc',
    subscribers: 5200,
    views: 180000,
    lastMonthViews: 12000,
    engagementRate: 6.8,
    growth: 3.1
  }
];

// Exemplo de dados para gráficos (opcional, pode ser expandido conforme necessário)
const subscribersData = [
  { month: 'Jan', primary: 10200, secondary: 4200 },
  { month: 'Fev', primary: 10800, secondary: 4500 },
  { month: 'Mar', primary: 11200, secondary: 4700 },
  { month: 'Abr', primary: 11800, secondary: 4900 },
  { month: 'Mai', primary: 12200, secondary: 5100 },
  { month: 'Jun', primary: 12500, secondary: 5200 },
];

const viewsData = [
  { month: 'Jan', primary: 350000, secondary: 150000 },
  { month: 'Fev', primary: 380000, secondary: 160000 },
  { month: 'Mar', primary: 405000, secondary: 168000 },
  { month: 'Abr', primary: 425000, secondary: 172000 },
  { month: 'Mai', primary: 440000, secondary: 178000 },
  { month: 'Jun', primary: 450000, secondary: 180000 },
];

const COLORS = ['#007bff', '#00C49F', '#FFBB28', '#FF8042'];

const MediaManagement = () => {
  const [channels, setChannels] = useState(initialChannels);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChannel, setNewChannel] = useState({
    name: '',
    platform: 'youtube',
    url: '',
  });

  // Cálculo das métricas agregadas
  const totalSubscribers = channels.reduce((acc, channel) => acc + channel.subscribers, 0);
  const totalViews = channels.reduce((acc, channel) => acc + channel.views, 0);
  const averageEngagement =
    channels.length > 0
      ? channels.reduce((acc, channel) => acc + channel.engagementRate, 0) / channels.length
      : 0;
  const averageGrowth =
    channels.length > 0
      ? channels.reduce((acc, channel) => acc + channel.growth, 0) / channels.length
      : 0;

  // Atualiza os dados do novo canal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChannel({ ...newChannel, [name]: value });
  };

  // Adiciona um novo canal com dados mock (exemplo)
  const handleAddChannel = () => {
    if (!newChannel.name || !newChannel.url) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const mockSubscribers = Math.floor(Math.random() * 10000) + 1000;
    const mockViews = mockSubscribers * (Math.floor(Math.random() * 30) + 20);
    const mockEngagement = (Math.random() * 5) + 5;
    const mockGrowth = (Math.random() * 3) + 1;
    const channel = {
      id: channels.length + 1,
      name: newChannel.name,
      platform: newChannel.platform,
      url: newChannel.url,
      subscribers: mockSubscribers,
      views: mockViews,
      lastMonthViews: Math.floor(mockViews / 12),
      engagementRate: mockEngagement,
      growth: mockGrowth
    };
    setChannels([...channels, channel]);
    setNewChannel({ name: '', platform: 'youtube', url: '' });
    setShowAddModal(false);
  };

  // Remove um canal
  const handleRemoveChannel = (id) => {
    if (window.confirm('Tem certeza que deseja remover este canal?')) {
      setChannels(channels.filter(channel => channel.id !== id));
    }
  };

  // Função para simular atualização de dados
  const handleRefresh = () => {
    alert('Atualizando métricas... (Funcionalidade simulada)');
  };

  return (
    <div className="p-8">
      {/* Cabeçalho da seção */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Gestão de Mídias</h1>
        <div className="flex space-x-4">
          <button onClick={() => setShowAddModal(true)} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Canal
          </button>
          <button onClick={handleRefresh} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="mr-2 h-5 w-5" /> Atualizar Métricas
          </button>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 font-medium">Inscritos Totais</h3>
          <p className="text-2xl font-bold text-green-600">{totalSubscribers.toLocaleString('pt-BR')}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 font-medium">Visualizações Totais</h3>
          <p className="text-2xl font-bold text-green-600">{totalViews.toLocaleString('pt-BR')}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 font-medium">Engajamento Médio</h3>
          <p className="text-2xl font-bold text-blue-600">{averageEngagement.toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 font-medium">Crescimento Médio</h3>
          <p className="text-2xl font-bold text-blue-600">{averageGrowth.toFixed(1)}%</p>
        </div>
      </div>

      {/* Tabela de Canais */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plataforma</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inscritos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visualizações</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {channels.map((channel) => (
              <tr key={channel.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{channel.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{channel.platform}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{channel.subscribers.toLocaleString('pt-BR')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{channel.views.toLocaleString('pt-BR')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <button onClick={() => handleRemoveChannel(channel.id)} className="text-red-500 hover:text-red-700" title="Remover Canal">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {channels.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">Nenhum canal cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para Adicionar Canal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Adicionar Novo Canal</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">X</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Nome do Canal</label>
                <input type="text" name="name" value={newChannel.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600" placeholder="Ex: Meu Canal" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Plataforma</label>
                <select name="platform" value={newChannel.platform} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600">
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">URL do Canal</label>
                <input type="text" name="url" value={newChannel.url} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-600 focus:border-blue-600" placeholder="https://" />
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">Cancelar</button>
              <button onClick={handleAddChannel} className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-white hover:bg-blue-700 transition-colors">
                <div className="flex items-center">
                  <Check className="mr-2 h-5 w-5" /> Adicionar
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManagement;
