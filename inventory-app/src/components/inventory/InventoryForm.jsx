import { useState } from 'react';
import styles from './InventoryForm.module.css';

function InventoryForm({ onSubmit, loading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Назва є обов'язковим полем");
      return;
    }
    setError('');
    const formData = new FormData();
    formData.append('inventory_name', name.trim());
    formData.append('description', description);
    if (photo) formData.append('photo', photo);
    onSubmit(formData);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.field}>
        <label>Назва *</label>
        <input
          type="text"
          placeholder="Назва інвентарю"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label>Опис</label>
        <textarea
          placeholder="Короткий опис..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className={styles.field}>
        <label>Фото</label>
        <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
      </div>
      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? 'Збереження...' : 'ЗБЕРЕГТИ'}
      </button>
    </form>
  );
}

export default InventoryForm;
