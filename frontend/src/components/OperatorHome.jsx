import { useState } from 'react';
import axios from 'axios';

export default function OperatorHome({ token }) {
  const [sum, setSum] = useState('');
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAward = async () => {
    if (!sum || !user) {
      alert('Заполните сумму и логин');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/operator/award', 
        { userLogin: user, amount: parseInt(sum, 10) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSum('');
      setUser('');
    } catch (error) {
      console.error('Ошибка начисления:', error);
      alert('Не удалось начислить баллы: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async () => {
    if (!sum || !user) {
      alert('Заполните сумму и логин');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/operator/redeem', 
        { userLogin: user, amount: parseInt(sum, 10) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSum('');
      setUser('');
    } catch (error) {
      console.error('Ошибка списания:', error);
      alert('Не удалось списать баллы: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold text-coffee-800 mb-4">Операции с баллами</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-coffee-700 mb-1">Сумма (₽)</label>
          <input
            type="number"
            value={sum}
            onChange={(e) => setSum(e.target.value)}
            placeholder="150"
            className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-1 focus:ring-coffee-500"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm text-coffee-700 mb-1">Логин клиента</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="ivan123"
            className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-1 focus:ring-coffee-500"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAward}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? '...' : 'Начислить'}
          </button>
          <button
            onClick={handleRedeem}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? '...' : 'Списать'}
          </button>
        </div>
      </div>
    </div>
  );
}