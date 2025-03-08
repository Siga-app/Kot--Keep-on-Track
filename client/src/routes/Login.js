import React, { useState } from 'react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    if (!isLogin && !formData.fullName) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
      alert(isLogin ? 'Login realizado com sucesso!' : 'Registro realizado com sucesso!');
      window.location.href = '/dashboard';
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 py-6">
          <h2 className="text-center text-3xl font-bold text-white">KOT</h2>
          <p className="text-center text-blue-200">Keep On Track</p>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {isLogin ? 'Faça login na sua conta' : 'Crie sua conta'}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-6">
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Nome Completo</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Seu nome completo"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="seu@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="********"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            {isLogin && (
              <div className="mb-6 text-right">
                <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
                  Esqueceu sua senha?
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button onClick={toggleForm} className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none">
                {isLogin ? 'Registre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
