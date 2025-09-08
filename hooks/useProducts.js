import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import { addProduct } from "../services/addProducts";
import { editProduct } from "../services/editProduct";
import { deleteProduct } from "../services/deleteProduct";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async ({ searchParam = search, pageParam = page, limit = 10 } = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProducts({ page: pageParam, limit, name: searchParam });
      if (result?.data) {
        setProducts(result.data);
        setTotalPages(result.totalPages || 1);
      } else {
        setProducts(Array.isArray(result) ? result : []);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message || "خطا در دریافت محصولات");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (product) => {
    try {
      await addProduct(product);
      await fetchProducts({ pageParam: page, searchParam: search });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = async (id, product) => {
    try {
      await editProduct(id, product);
      await fetchProducts({ pageParam: page, searchParam: search });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await fetchProducts({ pageParam: page, searchParam: search });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return {
    products,
    page,
    setPage,
    totalPages,
    loading,
    error,
    fetchProducts,
    handleAdd,
    handleEdit,
    handleDelete,
    search,
    setSearch,
  };
}
