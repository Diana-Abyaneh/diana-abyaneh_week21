import API from "./axiosInstance";

const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw new Error("لطفاً مجدداً وارد سیستم شوید");
    }

    throw new Error(error.response?.data?.message || "خطا در حذف محصول");
  }
};

const deleteProducts = async (ids) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.delete(`/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { ids },
    });

    return response.data;
  } catch (error) {
    console.error("مشکل در حذف گروهی: ", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw new Error("لطفا مجددا وارد سیستم شوید");
    }

    throw new Error(
      error.response?.data?.message || "خطا در حذف گروهی محصولات"
    );
  }
};

export { deleteProduct, deleteProducts };
