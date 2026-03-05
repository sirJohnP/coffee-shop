import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function CustomerHome({ token, userId }) {
  const [balance, setBalance] = useState(null);
  const [name, setName] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const balanceRes = await axios.get(`/api/customer/balance?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const drinksRes = await axios.get(`/api/customer/products?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const drinksWithFullUrl = drinksRes.data.map(drink => ({
          ...drink,
          imageUrl: drink.imageUrl
        }));

        setBalance(balanceRes.data.balance);
        setName(balanceRes.data.name);
        setDrinks(drinksWithFullUrl);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-coffee-700">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 max-w-md mx-auto flex flex-col items-center justify-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="text-coffee-600 hover:underline"
        >
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-base text-coffee-600">Ваш баланс за этот сезон</h2>
        <p className="text-3xl font-bold text-coffee-800 mt-1">{balance} ₽</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-coffee-800 mb-3">
          Вам хватит на
        </h3>
        {drinks.length === 0 ? (
          <p className="text-coffee-500 text-sm text-center py-4">Нет доступных напитков</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {drinks.map((drink) => (
              <div
                key={drink.id}
                className="bg-white rounded-lg shadow-sm border border-coffee-100 overflow-hidden"
              >
                <div className="w-full aspect-square bg-coffee-100 flex items-center justify-center">
                  <img
                    src={drink.imageUrl}
                    alt={drink.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2 text-center">
                  <div className="text-xs font-medium text-coffee-800">{drink.name}</div>
                  <div className="text-xs text-coffee-600">{drink.price} ₽</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}