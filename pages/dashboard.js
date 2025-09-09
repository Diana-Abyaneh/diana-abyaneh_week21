import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useProducts } from "@/hooks/useProducts";
import ProductsTable from "@/components/ProductsTable";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

import AddProductModal from "@/components/AddProductModal";
import EditProductModal from "@/components/EditProductModal";
import DeleteProductModal from "@/components/DeleteProductModal";
import DeleteProductsModal from "@/components/DeleteBulkProductsModal";

import Image from "next/image";
import setting from "../assets/setting-3.svg";
import styles from "../styles/dashboard.module.css";

function Dashboard() {
  const router = useRouter();
  const { query } = router;
  const [selectedIds, setSelectedIds] = useState([]);

  const {
    products,
    totalPages,
    fetchProducts,
    handleAdd,
    handleEdit,
    handleDelete,
    handleBulkDelete,
    page,
    setPage,
    search,
    setSearch,
  } = useProducts();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userName, setUserName] = useState("");
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserName(localStorage.getItem("user") || "");
    }
  }, []);

  useEffect(() => {
    const q = query.q || "";
    const pageParam = parseInt(query.page || "1", 10);
    setSearch(q);
    setPage(pageParam);
  }, [query]);

  const updateQuery = (q, p) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (p) params.set("page", p);
    router.push(`/dashboard?${params.toString()}`);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    router.push("/login");
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const selectAllHandler = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar
        userName={userName}
        initialQuery={search}
        onLogout={logout}
        onSearch={(q) => {
          setSearch(q);
          fetchProducts({ searchParam: q, pageParam: 1 });
          updateQuery(q, 1);
        }}
      />

      <div className={styles.productManage}>
        <span className={styles.manageTitle}>
          <Image src={setting} alt="setting icon" />
          <h3>مدیریت کالا</h3>
        </span>
        <div className={styles.btnContainer}>
          <button className={styles.selectAll} onClick={selectAllHandler}>
            {selectedIds.length === products.length
              ? "لغو انتخاب همه"
              : "انتخاب همه"}
          </button>
          <button
            className={selectedIds.length > 0 ? styles.deleteAll : styles.disabled}
            disabled={selectedIds.length === 0}
            onClick={() => setShowBulkDeleteModal(true)}
          >
            {`حذف گروهی (${selectedIds.length})`}
          </button>
          <button
            className={styles.addProductBtn}
            onClick={() => setShowAddModal(true)}
          >
            افزودن محصول
          </button>
        </div>
      </div>

      <ProductsTable
        products={products}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(newPage) => {
          setPage(newPage);
          fetchProducts({ searchParam: search, pageParam: newPage });
          updateQuery(search, newPage);
        }}
      />

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onConfirm={async (newProduct) => {
          await handleAdd(newProduct);
          setShowAddModal(false);
        }}
      />

      {selectedProduct && (
        <EditProductModal
          isOpen={showEditModal}
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onConfirm={async (updatedProduct) => {
            await handleEdit(selectedProduct.id, updatedProduct);
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {selectedProduct && (
        <DeleteProductModal
          isOpen={showDeleteModal}
          product={selectedProduct}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
          onConfirm={async (id) => {
            await handleDelete(id);
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
        />
      )}

      {selectedIds && (
        <DeleteProductsModal
          isOpen={showBulkDeleteModal}
          count={selectedIds.length}
          onClose={() => setShowBulkDeleteModal(false)}
          onConfirm={async () => {
            await handleBulkDelete(selectedIds, () => setSelectedIds([]));
            setShowBulkDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
