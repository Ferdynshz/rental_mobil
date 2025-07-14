const axios = require("axios");

const API_URL = "http://localhost:5199/api/Penyewa";

// Ambil semua transaksi
exports.getAllTransaksi = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching all Transaksi:", error.message);
    return [];
  }
};

// Tambah transaksi baru
exports.addTransaksi = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error adding Transaksi:", error.message);
    return null;
  }
};

// Cari transaksi berdasarkan ID
exports.findTransaksiById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const data = response.data;

    console.log("Data transaksi dari API:", data);

    return {
      IdTransaksi: data.idTransaksi,
      Nama: data.nama,
      Alamat: data.alamat,
      NomorTelepon: data.nomorTelepon,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn(`Transaksi dengan ID ${id} tidak ditemukan.`);
      return null;
    } else {
      console.error("Error saat mengambil transaksi:", error.message);
      throw error;
    }
  }
};

// Update transaksi
exports.updateTransaksi = async (id, updatedData) => {
  try {
    const response = axios.put(`${API_URL}/${id}`, updatedData);
    console.log("Response", response);
    return response.data;
  } catch (error) {
    console.error(`Error updating transaksi ID ${id}:`, error.message);
    return null;
  }
};

// Hapus transaksi
exports.deleteTransaksi = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting transaksi ID ${id}:`,
      error.response?.data || error.message
    );
    return false;
  }
};
