const fs = require('fs-extra');
const path = require('path');

const dataFile = path.join(__dirname, '../data/penyewas.json');

// Fungsi bantu untuk load data
async function loadPenyewas() {
  return await fs.readJSON(dataFile);
}

// Fungsi bantu untuk simpan data
async function savePenyewas(penyewas) {
  await fs.writeJSON(dataFile, penyewas, { spaces: 2 });
}

// Tampilkan daftar penyewa
exports.index = async (req, res) => {
  const penyewas = await loadPenyewas();
  res.render('penyewa/index', { penyewas });
};

// Tampilkan detail
exports.show = async (req, res) => {
  const penyewas = await loadPenyewas();
  const penyewa = penyewas.find(p => p.id === parseInt(req.params.id));
  if (!penyewa) return res.status(404).send('Penyewa tidak ditemukan');
  res.render('penyewa/show', { penyewa });
};

// Form create
exports.createForm = (req, res) => {
  res.render('penyewa/create');
};

// Simpan baru
exports.create = async (req, res) => {
  const penyewas = await loadPenyewas();
  const { nama, alamat, nomor_telepon } = req.body;
  if (!nama || !alamat || !nomor_telepon) return res.status(400).send('Semua data wajib diisi');

  const newPenyewa = {
    id: penyewas.length > 0 ? penyewas[penyewas.length - 1].id + 1 : 1,
    nama: nama.trim(),
    alamat: alamat.trim(),
    nomor_telepon: nomor_telepon.trim()
  };
  penyewas.push(newPenyewa);
  await savePenyewas(penyewas);
  res.redirect('/penyewa');
};

// Form edit
exports.editForm = async (req, res) => {
  const penyewas = await loadPenyewas();
  const penyewa = penyewas.find(p => p.id === parseInt(req.params.id));
  if (!penyewa) return res.status(404).send('Penyewa tidak ditemukan');
  res.render('penyewa/edit', { penyewa });
};

// Update
exports.update = async (req, res) => {
  const penyewas = await loadPenyewas();
  const penyewa = penyewas.find(p => p.id === parseInt(req.params.id));
  if (!penyewa) return res.status(404).send('Penyewa tidak ditemukan');

  penyewa.nama = req.body.nama?.trim() || penyewa.nama;
  penyewa.alamat = req.body.alamat?.trim() || penyewa.alamat;
  penyewa.nomor_telepon = req.body.nomor_telepon?.trim() || penyewa.nomor_telepon;

  await savePenyewas(penyewas);
  res.redirect('/penyewa');
};

// Hapus
exports.delete = async (req, res) => {
  let penyewas = await loadPenyewas();
  penyewas = penyewas.filter(p => p.id !== parseInt(req.params.id));
  await savePenyewas(penyewas);
  res.redirect('/penyewa');
};
