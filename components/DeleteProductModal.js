import styles from "../styles/confirmModal.module.css";
import close from "../assets/Close.svg";
import Image from "next/image";

function DeleteProductModal({ isOpen, onClose, onConfirm, product }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>حذف محصول</h2>
          <button 
            type="button"
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="بستن modal"
          >
            ×
          </button>
        </div>

        <div className={styles.deleteModalBody}>
            <Image src={close} alt="close icon" />
          <p>آیا از حذف محصول <strong>"{product?.name}"</strong> اطمینان دارید؟</p>
        </div>

        <div className={styles.modalActions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={() => onConfirm(product.id)}
            className={styles.deleteButton}
          >
            حذف محصول
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductModal;