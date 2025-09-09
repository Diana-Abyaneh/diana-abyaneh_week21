import styles from "../styles/confirmModal.module.css";
import close from "../assets/Close.svg";
import Image from "next/image";

function DeleteProductsModal({ isOpen, onClose, onConfirm, count }) {
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
          <h2>حذف گروهی محصولات</h2>
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
          <p>
            آیا از حذف <strong>{count}</strong> محصول انتخاب‌شده اطمینان دارید؟
          </p>
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
            onClick={onConfirm}
            className={styles.deleteButton}
          >
            حذف محصولات
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProductsModal;
