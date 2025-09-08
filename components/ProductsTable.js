import Image from "next/image";
import editVector from "../assets/edit.svg";
import deleteVector from "../assets/trash.svg";
import styles from "../styles/ProductsTable.module.css";

function ProductsTable({ products, onEdit, onDelete }) {
  if (!products.length) {
    return <div className={styles.emptyState}>هیچ محصولی یافت نشد</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>{(p.price * 1000).toLocaleString()} تومان</td>
              <td>{p.id}</td>
              <td>
                <button className={styles.actionBtn} onClick={() => onEdit(p)}>
                  <Image src={editVector} alt="ویرایش" />
                </button>
                <button className={styles.actionBtn} onClick={() => onDelete(p)}>
                  <Image src={deleteVector} alt="حذف" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
