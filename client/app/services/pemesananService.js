import api from "./apiConfig";

// Fungsi untuk ambil semua data pesanan
export const fetchPemesanan = async () => {
  try {
    const response = await api.get("/pemesanan/");
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil pesanan:", error);
    throw error;
  }
};

// Fungsi untuk ambil data pesanan berdasarkan id
export const fetchPemesananById = async (id) => {
  try {
    const response = await api.get(`/pemesanan/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil pesanan:", error);
    throw error;
  }
};

// Fungsi untuk menambahkan pesanan baru
export const postPemesanan = async (dataPesanan) => {
  try {
    const response = await api.post("/pemesanan/", dataPesanan);
    return response.data;
  } catch (error) {
    console.error("Gagal simpan pesanan:", error);
    throw error;
  }
};

// Fungsi untuk update pesananan yang ada
export const updatePemesanan = async (id, updatedData) => {
  try {
    const response = await api.put(`/pemesanan/${id}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Gagal update pesanan:", error);
    throw error;
  }
};

// Fungsi untuk menghapus pemesanan berdasarkan ID
export const deletePemesanan = async (id) => {
  try {
    const response = await api.delete(`/pemesanan/${id}/`);
    return response.data;
  } catch (error) {
    console.log("Gagal menghapus pemesanan: ", error);
    throw error;
  }
};