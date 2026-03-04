import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminHome({ token }) {
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
      <h2 className="text-xl font-bold text-coffee-800 mb-6 text-center">Админка</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-coffee-100 shadow-sm text-center">
          <div className="text-sm text-coffee-600">Всего пользователей</div>
          <div className="text-2xl font-bold text-coffee-800 mt-2">{stats.totalUsers}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-coffee-100 shadow-sm text-center">
          <div className="text-sm text-coffee-600">Баллов подарено</div>
          <div className="text-2xl font-bold text-coffee-800 mt-2">{stats.totalAwarded}</div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-coffee-100 shadow-sm text-center">
          <div className="text-sm text-coffee-600">Покупок за баллы</div>
          <div className="text-2xl font-bold text-coffee-800 mt-2">{stats.totalRedeemed}</div>
        </div>
      </div>

      <div className="mt-6">
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
                alert('Ошибка: ' + (err.response?.data?.message || err.message));
              }
            }
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium text-base"
        >
          Закончить сезон
        </button>
      </div>
    </div>
  );
}