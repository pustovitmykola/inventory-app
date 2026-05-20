import { getPhotoUrl } from '../../services/inventoryApi';
import styles from './InventoryQuickView.module.css';

export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <img
          src={item.photo || getPhotoUrl(item.id)}
          alt={item.inventory_name}
          className={styles.photo}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <h2 className={styles.name}>{item.inventory_name}</h2>
        <p className={styles.description}>{item.description || 'Опис відсутній'}</p>
      </div>
    </div>
  );
}
