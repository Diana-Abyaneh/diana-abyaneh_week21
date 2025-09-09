import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../services/products";
import { addProduct } from "../services/addProducts";
import { editProduct } from "../services/editProduct";
import { deleteProduct, deleteProducts } from "../services/deleteProduct";

export function useProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchProducts = async ({ searchParam = search, pageParam = page, limit = 10 } = {}) => {
    try {
      setLoading(true);
      setError(null);

      let validPage = pageParam < 1 ? 1 : pageParam;
      if (totalPages && validPage > totalPages) validPage = totalPages;

      const params = { page: validPage, limit };
      if (searchParam && searchParam.trim() !== "") params.name = searchParam;

      console.log("Fetching products with params:", params);

      const result = await getProducts(params);
      console.log("API result:", result);

      if (result?.data) {
        if (result.data.length === 0) {
          if (validPage > 1 && validPage <= totalPages) {
            const newPage = validPage - 1;
            setPage(newPage);
            syncPageWithUrl(newPage);
          } else {
            setProducts([]);
            setTotalPages(1);
          }
        } else {
          setProducts(result.data);
          setTotalPages(result.totalPages || 1);
        }
      }
    } catch (err) {
      console.error("Fetch products error:", err);
      setError(err.response?.data?.message || err.message || "خطا در دریافت محصولات");
    } finally {
      setLoading(false);
    }
  };

  const syncPageWithUrl = (newPage) => {
    router.replace(`/dashboard?page=${newPage}`, { scroll: false });
  };

  const handleAdd = async (product) => {
    try {
      await addProduct(product);
      await fetchProducts({ pageParam: page, searchParam: search });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleEdit = async (id, product) => {
    try {
      await editProduct(id, product);
      await fetchProducts({ pageParam: page, searchParam: search });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      const newPage = products.length === 1 && page > 1 ? page - 1 : page;
      setPage(newPage);
      syncPageWithUrl(newPage);

      await fetchProducts({ pageParam: newPage, searchParam: search });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleBulkDelete = async (ids, clearSelection) => {
    try {
      await deleteProducts(ids);
      console.log("deleted:", ids);

      const newPage = products.length === ids.length && page > 1 ? page - 1 : page;
      setPage(newPage);
      syncPageWithUrl(newPage);

      await fetchProducts({ pageParam: newPage, searchParam: search });

      if (clearSelection) clearSelection();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {
    products,
    page,
    setPage: (p) => {
      setPage(p);
      syncPageWithUrl(p);
    },
    totalPages,
    loading,
    error,
    fetchProducts,
    handleAdd,
    handleEdit,
    handleDelete,
    handleBulkDelete,
    search,
    setSearch,
  };
}
