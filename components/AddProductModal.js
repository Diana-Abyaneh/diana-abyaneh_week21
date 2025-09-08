import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "../styles/confirmModal.module.css";

function AddProductModal({ onClose, onConfirm, isOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm({
    defaultValues: {
      name: "",
      quantity: "",
      price: ""
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const productData = {
        name: data.name.trim(),
        quantity: parseInt(data.quantity),
        price: parseFloat(data.price),
        stock: parseInt(data.quantity)
      };
      
      await onConfirm(productData);
      reset();
      onClose();
    } catch (error) {
      setError("submit", {
        type: "manual",
        message: error.message || "خطا در ایجاد محصول"
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>ایجاد محصول جدید</h2>
          <button 
            type="button"
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="بستن modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              نام کالا *
            </label>
            <input
              type="text"
              id="name"
              className={errors.name ? styles.inputError : styles.input}
              placeholder="نام محصول را وارد کنید"
              {...register("name", {
                required: "نام کالا الزامی است",
                minLength: {
                  value: 2,
                  message: "نام کالا باید حداقل ۲ کاراکتر باشد"
                },
                maxLength: {
                  value: 100,
                  message: "نام کالا نمی‌تواند بیش از ۱۰۰ کاراکتر باشد"
                }
              })}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="quantity" className={styles.label}>
              تعداد موجودی *
            </label>
            <input
              type="number"
              id="quantity"
              className={errors.quantity ? styles.inputError : styles.input}
              placeholder="0"
              min="0"
              {...register("quantity", {
                required: "تعداد موجودی الزامی است",
                min: {
                  value: 0,
                  message: "تعداد موجودی نمی‌تواند منفی باشد"
                },
                max: {
                  value: 10000,
                  message: "تعداد موجودی نمی‌تواند بیش از ۱۰,۰۰۰ باشد"
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "لطفاً فقط عدد وارد کنید"
                }
              })}
            />
            {errors.quantity && (
              <span className={styles.errorText}>{errors.quantity.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              قیمت (هزار تومان) *
            </label>
            <input
              type="number"
              id="price"
              className={errors.price ? styles.inputError : styles.input}
              placeholder="0"
              min="0"
              step="1"
              {...register("price", {
                required: "قیمت الزامی است",
                min: {
                  value: 1,
                  message: "قیمت باید بزرگتر از صفر باشد"
                },
                max: {
                  value: 1000000,
                  message: "قیمت نمی‌تواند بیش از ۱,۰۰۰,۰۰۰ هزار تومان باشد"
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "لطفاً فقط عدد وارد کنید"
                }
              })}
            />
            {errors.price && (
              <span className={styles.errorText}>{errors.price.message}</span>
            )}
          </div>

          {errors.submit && (
            <div className={styles.submitError}>
              {errors.submit.message}
            </div>
          )}

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ایجاد..." : "ایجاد محصول"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;