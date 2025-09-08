import API from "./axiosInstance";

export const registerUser = async (username, password) => {
  try {
    const response = await API.post("/auth/register", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await API.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};