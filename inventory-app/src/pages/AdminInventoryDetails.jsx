import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInventoryItem } from '../services/inventoryApi';
import InventoryDetails from '../components/inventory/InventoryDetails';
import styles from './AdminForm.module.css';

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    getInventoryItem(id).then(setItem);
  }, [id]);

  if (!item) return <div className={styles.page}>Завантаження...</div>;

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/admin')}>← Назад</button>
      <h1 className={styles.title}>Деталі інвентарю</h1>
      <InventoryDetails item={item} />
    </div>
  );
}
