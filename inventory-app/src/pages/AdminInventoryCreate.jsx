import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInventory } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';
import styles from './AdminForm.module.css';

export default function AdminInventoryCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    setLoading(true);
    try {
      await createInventory(formData);
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/admin')}>← Назад</button>
      <h1 className={styles.title}>Новий інвентар</h1>
      <InventoryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
