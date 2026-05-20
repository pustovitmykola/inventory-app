import { getPhotoUrl } from '../../services/inventoryApi';
import styles from './InventoryDetails.module.css';

function InventoryDetails({ item }) {
  return (
    <div className={styles.details}>
      {item.photo && (
        <img
          src={item.photo || getPhotoUrl(item.id)}
          alt={item.inventory_name}
          className={styles.photo}
        />
      )}
      <h2 className={styles.name}>{item.inventory_name}</h2>
      <p className={styles.description}>{item.description || 'Опис відсутній'}</p>
    </div>
  );
}

export default InventoryDetails;
