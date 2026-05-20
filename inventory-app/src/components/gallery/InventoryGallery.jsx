import InventoryCard from './InventoryCard';
import styles from './InventoryGallery.module.css';

export default function InventoryGallery({ items, onCardClick, isFavorite, onToggleFavorite }) {
  return (
    <div className={styles.grid}>
      {items.map(item => (
        <InventoryCard
          key={item.id}
          item={item}
          onClick={() => onCardClick(item)}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
