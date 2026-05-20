import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInventoryItem, updateInventory, updateInventoryPhoto } from '../services/inventoryApi';
import styles from './AdminForm.module.css';
import editStyles from './AdminInventoryEdit.module.css';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [textSaved, setTextSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInventoryItem(id).then(data => {
      setItem(data);
      setName(data.inventory_name);
      setDescription(data.description || '');
    });
  }, [id]);

  async function handleTextSave(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await updateInventory(id, { inventory_name: name, description });
    setTextSaved(true);
    setLoading(false);
    setTimeout(() => setTextSaved(false), 2000);
  }

  async function handlePhotoSave(e) {
    e.preventDefault();
    if (!photo) return;
    const formData = new FormData();
    formData.append('photo', photo);
    setLoading(true);
    await updateInventoryPhoto(id, formData);
    setLoading(false);
    navigate('/admin');
  }

  if (!item) return <div className={styles.page}>Завантаження...</div>;

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/admin')}>← Назад</button>
      <h1 className={styles.title}>Редагування</h1>

      {textSaved && <p className={editStyles.saved}>✅ Текстові дані збережено</p>}

      <div className={editStyles.section}>
        <h3 className={editStyles.sectionTitle}>Текстові дані</h3>
        <form onSubmit={handleTextSave} className={editStyles.form}>
          <label>Назва *</label>
          <input value={name} onChange={e => setName(e.target.value)} />
          <label>Опис</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} />
          <button type="submit" disabled={loading}>Зберегти текст</button>
        </form>
      </div>

      <div className={editStyles.section}>
        <h3 className={editStyles.sectionTitle}>Оновити фото</h3>
        <form onSubmit={handlePhotoSave} className={editStyles.form}>
          <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} />
          <button type="submit" disabled={loading || !photo}>Оновити фото</button>
        </form>
      </div>
    </div>
  );
}
