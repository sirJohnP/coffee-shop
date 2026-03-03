import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginScreen from './components/LoginScreen';
import CustomerHome from './components/CustomerHome';
import CustomerHistory from './components/CustomerHistory';
import OperatorHome from './components/OperatorHome';
import AdminHome from './components/AdminHome';
import RegisterScreen from './components/RegisterScreen';
import AdminOperators from './components/AdminOperators';

export default function App() {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [customerView, setCustomerView] = useState('home');
  const [showRegister, setShowRegister] = useState(false);
  const [adminView, setAdminView] = useState('home');


  useEffect(() => {
  const saved = localStorage.getItem('loyaltySession');
  if (saved) {
    const { role, token, userId, name } = JSON.parse(saved);
    setRole(role);
    setToken(token);
    setUserId(userId);
    setName(name);
    setCustomerView('home');
  }
}, []);

  const handleLogin = async (loginData) => {
    if (!loginData?.login || !loginData?.role) return;

    try {
      const res = await axios.post('/api/auth/login', loginData);
      const { token, role, userId, name } = res.data;

      setRole(role);
      setToken(token);
      setUserId(userId);
      setName(name);
      localStorage.setItem('loyaltySession', JSON.stringify({ role, token, userId, name }));
    } catch (error) {
      alert('Ошибка входа: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    setRole(null);
    setToken(null);
    setUserId(null);
    setCustomerView('home');
    localStorage.removeItem('loyaltySession');
  };

  console.log('Текущая роль:', role);


  if (!role) {
    return showRegister ? (
      <RegisterScreen onRegister={() => setShowRegister(false)} />
    ) : (
      <LoginScreen 
        onLogin={handleLogin} 
        onRegister={() => setShowRegister(true)} 
      />
    );
  }

  return (
    <div className="flex flex-col h-dvh bg-coffee-50">
      <div className="flex justify-between items-center p-3 border-b border-coffee-200 bg-white gap-3">
        {role === 'customer' && customerView === 'home' && (
          <button
            onClick={() => setCustomerView('history')}
            className="text-sm font-medium text-coffee-700 hover:text-coffee-900"
          >
            История
          </button>
        )}
        {role === 'customer' && customerView === 'history' && (
          <button
            onClick={() => setCustomerView('home')}
            className="text-sm font-medium text-coffee-700 hover:text-coffee-900"
          >
            Назад
          </button>
        )}

        {role === 'customer' && <div className="text-sm font-medium text-coffee-800">{name}</div>}

        <button
          onClick={handleLogout}
          className="text-sm font-medium text-coffee-700 hover:text-coffee-900"
        >
          Выйти
        </button>
      </div>

      {role === 'customer' && customerView === 'home' && (
        <CustomerHome token={token} userId={userId} />
      )}
      {role === 'customer' && customerView === 'history' && (
        <CustomerHistory token={token} userId={userId} onBack={() => setCustomerView('home')} />
      )}

      {role === 'operator' && <OperatorHome token={token} />}

      {role === 'admin' && adminView === 'home' && <AdminHome token={token} onSwitchToOperators={() => setAdminView('operators')} />}
      {role === 'admin' && adminView === 'operators' && <AdminOperators token={token} onBack={() => setAdminView('home')} />}
    </div>
  );
}