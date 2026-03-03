import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomerHistory({ token, userId, onBack }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId || !token) return;

      try {
        setError(null);
        const res = await axios.get(`/api/customer/history?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Ошибка загрузки истории:', err);
        setError('Не удалось загрузить историю');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, token]);

  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(history.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageItems = history.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 max-w-md mx-auto">
        <div className="text-coffee-700">Загрузка истории...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col p-4 max-w-md mx-auto">
        <div className="text-red-600 text-center mb-4">{error}</div>
        <button
          onClick={onBack}
          className="w-full bg-coffee-100 text-coffee-700 py-2 rounded-lg font-medium"
        >
          Назад
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold text-coffee-800 mb-4">История операций</h2>

      <div className="flex-1 space-y-2 mb-6">
        {currentPageItems.length === 0 ? (
          <div className="text-coffee-600 text-center py-4">История пуста</div>
        ) : (
          currentPageItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-3 border border-coffee-100"
            >
              <div className="text-sm">
                <span className="text-coffee-600">
                  {new Date(item.timestamp).toLocaleDateString('ru-RU')}
                </span> —{' '}
                <span className={item.type === 'REDEEM' ? 'text-red-600' : 'text-green-600'}>
                  {item.type === 'AWARD' ? 'Пополнение' : 'Списание'} {item.amount} ₽
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mb-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'text-coffee-300' : 'text-coffee-700 hover:bg-coffee-100'
            }`}
          >
            ←
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === page
                    ? 'bg-coffee-600 text-white'
                    : 'text-coffee-700 hover:bg-coffee-100'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? 'text-coffee-300' : 'text-coffee-700 hover:bg-coffee-100'
            }`}
          >
            →
          </button>
        </div>
      )}

      <button
        onClick={onBack}
        className="w-full bg-coffee-100 text-coffee-700 py-2 rounded-lg font-medium"
      >
        Назад
      </button>
    </div>
  );
}