import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminHome({ token, onSwitchToOperators }) {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAwarded: 0,
    totalRedeemed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (error) {
        console.error('Ошибка загрузки статистики:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold text-coffee-800 mb-6">Админка</h2>

      <button
        onClick={onSwitchToOperators}
        className="mb-6 w-full bg-coffee-100 text-coffee-700 py-2 rounded-lg font-medium"
      >
        Управление операторами
      </button>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-coffee-100 text-center">
          <div className="text-xs text-coffee-600">Всего пользователей</div>
          <div className="text-xl font-bold text-coffee-800 mt-1">{stats.totalUsers}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-coffee-100 text-center">
          <div className="text-xs text-coffee-600">Баллов подарено</div>
          <div className="text-xl font-bold text-coffee-800 mt-1">{stats.totalAwarded}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-coffee-100 text-center">
          <div className="text-xs text-coffee-600">Покупок за баллы</div>
          <div className="text-xl font-bold text-coffee-800 mt-1">{stats.totalRedeemed}</div>
        </div>
      </div>

      <button
        onClick={async () => {
          if (window.confirm('Вы уверены? Все балансы будут обнулены!')) {
            try {
              await axios.post(
                '/api/admin/season/reset',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
              );
              alert('Сезон завершён!');
            } catch (err) {
              alert('Ошибка: ' + (err.response?.data || err.message));
            }
          }
        }}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium"
      >
        Закончить сезон
      </button>
    </div>
  );
}