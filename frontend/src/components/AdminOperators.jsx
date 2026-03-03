import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminOperators({ token, onBack }) {
  const [operators, setOperators] = useState([]);
  const [newOpLogin, setNewOpLogin] = useState('');
  const [newOpPassword, setNewOpPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  console.log('Operators data:', operators);

  useEffect(() => {
    const fetchOperators = async () => {
        if (!token) return;

        try {
        const res = await axios.get('/api/admin/operators', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setOperators(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
        console.error('Ошибка загрузки операторов:', error);
        setOperators([]);
        }
    };
    fetchOperators();
    }, [token]);

  const handleCreateOperator = async (e) => {
    e.preventDefault();
    if (!newOpLogin || !newOpPassword) return;

    setLoading(true);
    try {
      await axios.post('/api/admin/operators', {
        login: newOpLogin,
        password: newOpPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(`Оператор "${newOpLogin}" создан`);
      setNewOpLogin('');
      setNewOpPassword('');
      const res = await axios.get('/api/admin/operators', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOperators(res.data);
    } catch (error) {
      setMessage('Ошибка создания оператора');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold text-coffee-800 mb-4">Операторы</h2>

      <button
        onClick={onBack}
        className="mb-4 text-coffee-600 hover:text-coffee-800 text-sm font-medium"
      >
        ← Назад
      </button>

      <form onSubmit={handleCreateOperator} className="mb-6 space-y-3">
        <input
          type="text"
          value={newOpLogin}
          onChange={(e) => setNewOpLogin(e.target.value)}
          placeholder="Логин оператора"
          className="w-full px-3 py-2 border border-coffee-200 rounded-lg"
          required
        />
        <input
          type="password"
          value={newOpPassword}
          onChange={(e) => setNewOpPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full px-3 py-2 border border-coffee-200 rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-coffee-600 text-white py-2 rounded-lg"
        >
          {loading ? '...' : 'Добавить оператора'}
        </button>
      </form>

      {message && (
        <div className="mb-4 p-2 bg-green-50 text-green-700 text-sm rounded">
          {message}
        </div>
      )}

      <div>
        <h3 className="font-medium text-coffee-700 mb-2">Существующие операторы ({operators.length})</h3>
        {operators.length === 0 ? (
          <p className="text-coffee-500 text-sm">Нет операторов</p>
        ) : (
          <ul className="space-y-1">
            {Array.isArray(operators) && operators.length > 0 ? (
            <ul className="space-y-1">
                {operators.map(op => (
                <li key={op.id} className="text-sm text-coffee-700 bg-coffee-50 p-2 rounded">
                    {op.login}
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-coffee-500 text-sm">Нет операторов</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}