import { useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id);
      const next = exists
        ? prev.filter(f => f.id !== item.id)
        : [...prev, item];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
