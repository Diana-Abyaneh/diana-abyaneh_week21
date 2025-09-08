import styles from "../styles/Pagination.module.css";

function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages < 1) return null;

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage); 
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className={styles.paginationArrow}
      >
        ‹
      </button>

      <div className={styles.paginationPages}>
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => changePage(num)}
            className={`${styles.paginationCircle} ${
              currentPage === num ? styles.paginationCircleActive : ""
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
        className={styles.paginationArrow}
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;
