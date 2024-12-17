import api from "./apiConfig";

// Fungsi untuk mengambil data pelanggan
export const fetchPelanggan = async () => {
  try {
    const pelanggan = await api.get("/pelanggan/");
    return pelanggan;
  } catch (error) {
    throw new Error("Gagal mengambil data pelanggan: ", error);
  }
};

// Fungsi untuk mengambil data pelanggan berdasarkan id
export const fetchPelangganById = async (id) => {
  try {
    const response = await api.get(`/pelanggan/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil data pelanggan berdasarkan id: ", error);
  }
};

// Fungsi untuk simpan data pelanggan
export const postPelanggan = async (dataPelanggan) => {
  try {
    const response = await api.post("/pelanggan/", dataPelanggan);
    return response.data;
  } catch (error) {
    throw new Error("Error saat menyimpan pelanggan:", error);
  }
};

// Fungsi untuk update data pelanggan
export const updatePelanggan = async (id, data) => {
  try {
    const response = await api.put(`/pelanggan/${id}/`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error updating pelanggan data: ", error);
  }
};