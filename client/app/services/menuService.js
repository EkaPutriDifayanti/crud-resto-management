import api from "./apiConfig";

// Fungsi untuk mengambil semua data menu
export const fetchMenu = async () => {
  try {
    const response = await api.get("/menu/");
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error("Data menu tidak dalam format array");
    }
  } catch (error) {
    throw new Error("Gagal mengambil list data menu:", error);
  }
};

// Fungsi untuk mengambil data berdasarkan id
export const fetchMenuByIds = async (ids) => {
  try {
    const requests = ids.map((id) => api.get(`/menu/${id}/`));
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  } catch (error) {
    throw new Error("Gagal mengambil data menu:", error);
  }
};