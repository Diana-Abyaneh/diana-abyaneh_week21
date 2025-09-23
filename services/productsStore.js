import API from "./axiosInstance";

export const getProductsStore = async ({ page = 1, limit = 10 } = {}) => {
  try {
    const response = await API.get(`/products`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      return { data: [], totalPages: 0 };
    }
    console.error("API Error (Store):", error);
    throw error;
  }
};
