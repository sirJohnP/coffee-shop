import { useState } from 'react';
import axios from 'axios';

export default function AdminOperators({ token, onBack }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!login || !password) {
      alert('Заполните логин и пароль');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/admin/operators', 
        { login, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLogin('');
      setPassword('');
      alert('Оператор создан');
    } catch (err) {
      alert('Ошибка: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-sm font-medium text-coffee-700 hover:text-coffee-900"
        >
          ← Назад
        </button>
        <h2 className="text-lg font-bold text-coffee-800">Операторы</h2>
        <div></div> 
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Логин оператора"
          className="w-full px-3 py-2 border border-coffee-200 rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full px-3 py-2 border border-coffee-200 rounded-lg"
        />
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-coffee-600 hover:bg-coffee-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? '...' : 'Создать оператора'}
        </button>
      </div>
    </div>
  );
}