const fs = require('fs-extra');
const path = require('path');

const dataFile = path.join(__dirname, '../data/penyewas.json');

// Ambil semua penyewa
async function getAllPenyewas() {
  const data = await fs.readJSON(dataFile);
  return Array.isArray(data) ? data : [];
}

// Tambah penyewa baru
async function addPenyewa(data) {
  const penyewas = await getAllPenyewas();
  penyewas.push(data);
  await fs.writeJSON(dataFile, penyewas, { spaces: 2 });
}

// Cari penyewa berdasarkan nama
async function findPenyewaByName(name) {
  const penyewas = await getAllPenyewas();
  return penyewas.find(p => p.nama.toLowerCase() === name.toLowerCase());
}

// Cari penyewa berdasarkan ID (tambahan opsional)
async function findPenyewaById(id) {
  const penyewas = await getAllPenyewas();
  return penyewas.find(p => p.id === id);
}

module.exports = {
  getAllPenyewas,
  addPenyewa,
  findPenyewaByName,
  findPenyewaById
};
