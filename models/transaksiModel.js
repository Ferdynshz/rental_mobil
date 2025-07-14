const axios = require("axios");

const API_URL = "http://localhost:5199/api/Transaction";

// Ambil semua transaksi
exports.getAllTransaksi = async () => {
  try {
    const response = await axios.get(API_URL);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching transaksi:", error.message);
    return [];
  }
};

// Tambah transaksi baru
exports.addTransaksi = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error adding transaksi:", error.message);
    return null;
  }
};


// Ambil transaksi berdasarkan ID
exports.findTransaksiById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaksi by ID:", error.message);
    return null;
  }
};
