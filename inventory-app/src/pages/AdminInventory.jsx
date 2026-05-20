import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInventory, deleteInventory } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal';
import styles from './AdminInventory.module.css';

export default function AdminInventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getInventory()
      .then(setItems)
      .catch(() => setError('Помилка завантаження'))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(item) {
    setDeleteTarget(item);
  }

  async function confirmDelete() {
    await deleteInventory(deleteTarget.id);
    setItems(prev => prev.filter(i => i.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  if (loading) return <div className={styles.center}>Завантаження...</div>;
  if (error) return <div className={styles.center + ' ' + styles.error}>{error}</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Інвентар складу</h1>
        <button className={styles.addBtn} onClick={() => navigate('/admin/create')}>+ Додати</button>
      </div>

      {items.length === 0
        ? <p className={styles.empty}>Список порожній</p>
        : <InventoryTable items={items} onDelete={handleDelete} />
      }

      {deleteTarget && (
        <ConfirmModal
          itemName={deleteTarget.inventory_name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
