import { useState } from 'react';
import axios from 'axios';

export default function RegisterScreen({ onRegister }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim() || !name.trim() || !password || !confirmPassword) {
      setError('Заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('/api/customer/register', {
        phoneNumber: phoneNumber.trim(),
        name: name.trim(),
        password: password,
      });
      alert('Регистрация прошла успешно! Теперь войдите.');
      onRegister();
    } catch (err) {
      const msg = err.response?.data || 'Не удалось зарегистрироваться';
      setError(msg);
      console.error('Ошибка регистрации:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-dvh p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-coffee-800 mb-6">Регистрация</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-coffee-700 mb-1">Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-coffee-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm text-coffee-700 mb-1">Номер телефона</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-coffee-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm text-coffee-700 mb-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-coffee-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm text-coffee-700 mb-1">Подтверждение пароля</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-coffee-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-coffee-600 hover:bg-coffee-700 text-white py-2 rounded-lg font-medium disabled:opacity-60"
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <button
        onClick={onRegister}
        className="mt-4 text-coffee-600 hover:text-coffee-800 text-sm font-medium"
      >
        ← Уже есть аккаунт? Войти
      </button>
    </div>
  );
}