import { useNavigate } from 'react-router-dom';
import { getPhotoUrl } from '../../services/inventoryApi';
import styles from './InventoryTable.module.css';

function InventoryTable({ items, onDelete }) {
  const navigate = useNavigate();

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Фото</th>
          <th>Назва</th>
          <th>Опис</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>
              <img
                src={item.photo || getPhotoUrl(item.id)}
                alt={item.inventory_name}
                className={styles.preview}
                onError={e => { e.target.style.display = 'none'; }}
              />
            </td>
            <td>{item.inventory_name}</td>
            <td>{item.description || '—'}</td>
            <td className={styles.actions}>
              <button onClick={() => navigate(`/admin/${item.id}`)}>Переглянути</button>
              <button onClick={() => navigate(`/admin/${item.id}/edit`)}>Редагувати</button>
              <button className={styles.deleteBtn} onClick={() => onDelete(item)}>Видалити</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
