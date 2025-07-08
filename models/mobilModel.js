// Data mobil sementara (disimpan di memori sementara)
let mobilList = [];

// Ambil semua mobil
function getAllMobils() {
  return mobilList;
}

// Tambah mobil baru
function addMobil(data) {
  mobilList.push(data);
}

// Cari mobil berdasarkan ID
function findMobilById(id) {
  return mobilList.find(m => m.id === id);
}

// Update data mobil
function updateMobil(id, newData) {
  const index = mobilList.findIndex(m => m.id === id);
  if (index !== -1) {
    mobilList[index] = { ...mobilList[index], ...newData };
    return true;
  }
  return false;
}

// Hapus mobil berdasarkan ID
function deleteMobil(id) {
  const index = mobilList.findIndex(m => m.id === id);
  if (index !== -1) {
    mobilList.splice(index, 1);
    return true;
  }
  return false;
}

// Ekspor semua fungsi
module.exports = {
  getAllMobils,
  addMobil,
  findMobilById,
  updateMobil,
  deleteMobil
};
