import { getPhotoUrl } from '../../services/inventoryApi';
import styles from './InventoryCard.module.css';

function InventoryCard({ item, onClick, isFavorite, onToggleFavorite }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imgWrap}>
        <img
          src={item.photo || getPhotoUrl(item.id)}
          alt={item.inventory_name}
          className={styles.img}
          onError={e => { e.target.src = 'https://via.placeholder.com/220x180?text=No+photo'; }}
        />
        <button
          className={`${styles.favBtn} ${isFavorite ? styles.favActive : ''}`}
          onClick={e => { e.stopPropagation(); onToggleFavorite(item); }}
          title={isFavorite ? 'Видалити з улюблених' : 'Додати до улюблених'}
        >
          ♥
        </button>
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{item.inventory_name}</p>
      </div>
    </div>
  );
}

export default InventoryCard;
