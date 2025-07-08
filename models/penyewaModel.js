// models/penyewaModel.js

// Data penyewa sementara (in-memory)
// Di aplikasi nyata, ini bisa diganti dengan database (misalnya MySQL, MongoDB, dll)
let penyewaList = [];

// Fungsi untuk mendapatkan semua penyewa
function getAllPenyewa() {
  return penyewaList;
}

// Fungsi untuk menambahkan penyewa baru
function addPenyewa(data) {
  penyewaList.push(data);
}

// Fungsi untuk mencari penyewa berdasarkan nama (optional)
function findPenyewaByName(name) {
  return penyewaList.find(p => p.nama.toLowerCase() === name.toLowerCase());
}

// Ekspor fungsi-fungsi agar bisa digunakan di controller
module.exports = {
  getAllPenyewa,
  addPenyewa,
  findPenyewaByName
};
