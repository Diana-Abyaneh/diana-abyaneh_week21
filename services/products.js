import API from "./axiosInstance";

export const getProducts = async ({ page = 1, limit = 10, name = "" } = {}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
        name,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      return { data: [], totalPages: 0 };
    }
    console.error("API Error:", error);
    throw error;
  }
};
