import { useState } from 'react';
import axios from 'axios'; 

export default function LoginScreen({ onLogin, onRegister }) {
  const [role, setRole] = useState('customer');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit вызван');
    
    const loginData = { login, password, role };
    console.log('Отправляем данные:', loginData);

    try {
      const response = await axios.post('/api/auth/login', loginData);
      console.log('Успех, вызываем onLogin');
      onLogin(loginData);
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Не удалось войти: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="flex flex-col h-dvh p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-coffee-800 mb-6">Вход</h2>

      <div className="flex gap-2 mb-6">
        {[
          { value: 'customer', label: 'Покупатель' },
          { value: 'operator', label: 'Оператор' },
          { value: 'admin', label: 'Админ' },
        ].map((r) => (
          <button
            key={r.value}
            onClick={() => setRole(r.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              role === r.value
                ? 'bg-coffee-600 text-white'
                : 'bg-white text-coffee-700 border border-coffee-200'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-coffee-700 mb-1">Логин</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-coffee-500"
          />
        </div>
        <div>
          <label className="block text-sm text-coffee-700 mb-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-coffee-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-coffee-600 hover:bg-coffee-700 text-white py-2 rounded-lg font-medium"
        >
          Войти
        </button>
        <button
          type="button"
          onClick={onRegister}
          className="mt-4 text-coffee-600 hover:text-coffee-800 text-sm font-medium"
        >
          Нет аккаунта? Зарегистрироваться
        </button>
      </form>
    </div>
  );
}