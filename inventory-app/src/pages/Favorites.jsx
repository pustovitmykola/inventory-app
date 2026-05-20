import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import styles from './Gallery.module.css';

export default function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Улюблені</h1>
      {favorites.length === 0
        ? <p className={styles.empty}>Немає улюблених позицій</p>
        : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {favorites.map(item => (
              <InventoryCard
                key={item.id}
                item={item}
                onClick={() => {}}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )
      }
    </div>
  );
}
