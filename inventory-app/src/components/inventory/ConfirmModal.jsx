import styles from './ConfirmModal.module.css';

function ConfirmModal({ message, itemName, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h3 className={styles.title}>Підтвердження видалення</h3>
        <p className={styles.itemName}>Видалити <strong>{itemName}</strong>?</p>
        <p className={styles.warning}>Цю дію не можна скасувати.</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Скасувати</button>
          <button className={styles.confirmBtn} onClick={onConfirm}>Видалити</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
