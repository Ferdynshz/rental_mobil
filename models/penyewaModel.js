// models/penyewaModel.js

// Data penyewa sementara (in-memory)
// Di aplikasi nyata, ini bisa diganti dengan database (misalnya MySQL, MongoDB, dll)
let penyewaList = [
  {
    "id": 1,
    "nama": "Budi",
    "alamat": "Jakarta",
    "nomor_telepon": "081234567890"
  },
  {
    "id": 3,
    "nama": "wannn",
    "alamat": "jakarta",
    "nomor_telepon": "2324234"
  },
  {
    "id": 4,
    "nama": "ferdy",
    "alamat": "jakarta",
    "nomor_telepon": "37473349"
  },
  {
    "id": 5,
    "nama": "Ijat",
    "alamat": "Jakarta",
    "nomor_telepon": "0248303443"
  }
];

// Fungsi untuk mendapatkan semua penyewa
function getAllPenyewas() {
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
  getAllPenyewas,
  addPenyewa,
  findPenyewaByName
};
