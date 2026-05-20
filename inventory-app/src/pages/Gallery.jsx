import { useState, useEffect } from 'react';
import { getInventory } from '../services/inventoryApi';
import InventoryGallery from '../components/gallery/InventoryGallery';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { useFavorites } from '../hooks/useFavorites';
import styles from './Gallery.module.css';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    getInventory()
      .then(setItems)
      .catch(() => setError('Помилка завантаження'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.center}><div className={styles.skeleton} /><div className={styles.skeleton} /><div className={styles.skeleton} /></div>;
  if (error) return <div className={styles.center + ' ' + styles.error}>{error}</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Галерея інвентарю</h1>
      {items.length === 0
        ? <p className={styles.empty}>Інвентар відсутній</p>
        : (
          <InventoryGallery
            items={items}
            onCardClick={setSelected}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        )
      }
      {selected && (
        <InventoryQuickView item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
