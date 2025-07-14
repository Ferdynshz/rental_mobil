const axios = require("axios");

const API_URL = "http://localhost:5199/api/Penyewa"; 

// Ambil semua penyewa
exports.getAllPenyewas = async () => {
  try {
    const response = await axios.get(API_URL); 
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching all Penyewa:", error.message);
    return [];
  }
};


// Tambah penyewa baru
exports.addPenyewa = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error adding Penyewa:", error.message);
    return null;
  }
};

// Cari penyewa berdasarkan ID
exports.findPenyewaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const data = response.data;

    console.log("Data penyewa dari API:", data); 

    return {
      IdPenyewa: data.idPenyewa,
      Nama: data.nama,
      Alamat: data.alamat,
      NomorTelepon: data.nomorTelepon,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn(`Penyewa dengan ID ${id} tidak ditemukan.`);
      return null;
    } else {
      console.error("Error saat mengambil penyewa:", error.message);
      throw error;
    }
  }
};

// Update penyewa
exports.updatePenyewa = async (id, updatedData) => {
  try {
    const response = axios.put(`${API_URL}/${id}`, updatedData);
    console.log("Response", response);
    return response.data;
  } catch (error) {
    console.error(`Error updating Penyewa ID ${id}:`, error.message);
    return null;
  }
};

// Hapus penyewa
exports.deletePenyewa = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting Penyewa ID ${id}:`,
      error.response?.data || error.message
    );
    return false;
  }
};
