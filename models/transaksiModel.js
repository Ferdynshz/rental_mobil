// models/transaksiModel.js

// Data transaksi sementara (in-memory)
let transaksiList = [];

// Fungsi untuk mendapatkan semua transaksi
function getAllTransaksis() {
  return transaksiList;
}

// Fungsi untuk menambahkan transaksi baru
function addTransaksi(data) {
  const newId = transaksiList.length > 0 ? transaksiList[transaksiList.length - 1].id + 1 : 1;
  const newTransaksi = { id: newId, ...data };
  transaksiList.push(newTransaksi);
}

// Fungsi gabungan dengan data mobil dan penyewa (bisa dipakai di controller)
function getDetailTransaksi(mobils, penyewas) {
  return transaksiList.map(t => {
    const mobil = mobils.find(m => m.id === t.mobilId);
    const penyewa = penyewas.find(p => p.id === t.penyewaId);
    return {
      ...t,
      mobilMerk: mobil?.merk || 'Tidak ditemukan',
      penyewaNama: penyewa?.nama || 'Tidak ditemukan'
    };
  });
}

module.exports = {
  getAllTransaksis,
  addTransaksi,
  getDetailTransaksi
};
