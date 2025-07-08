const penyewaModel = require('../models/penyewaModel');

// Tampilkan daftar penyewa
exports.index = async (req, res) => {
  const penyewas = await penyewaModel.getAllPenyewas();
  res.render('penyewa/index', { penyewas });
};

// Tampilkan detail penyewa
exports.show = async (req, res) => {
  const penyewa = await penyewaModel.findPenyewaById(parseInt(req.params.id));
  if (!penyewa) return res.status(404).send('Penyewa tidak ditemukan');
  res.render('penyewa/show', { penyewa });
};

// Form untuk tambah penyewa
exports.createForm = (req, res) => {
  res.render('penyewa/create');
};

// Simpan penyewa baru
exports.create = async (req, res) => {
  const { nama, alamat, nomor_telepon } = req.body;
  if (!nama || !alamat || !nomor_telepon) {
    return res.status(400).send('Semua data wajib diisi');
  }

  const penyewas = await penyewaModel.getAllPenyewas();
  const newPenyewa = {
    id: penyewas.length > 0 ? penyewas[penyewas.length - 1].id + 1 : 1,
    nama: nama.trim(),
    alamat: alamat.trim(),
    nomor_telepon: nomor_telepon.trim()
  };

  await penyewaModel.addPenyewa(newPenyewa);
  res.redirect('/penyewa');
};

// Form untuk edit penyewa
exports.editForm = async (req, res) => {
  const penyewa = await penyewaModel.findPenyewaById(parseInt(req.params.id));
  if (!penyewa) return res.status(404).send('Penyewa tidak ditemukan');
  res.render('penyewa/edit', { penyewa });
};

// Proses update data penyewa
exports.update = async (req, res) => {
  const penyewas = await penyewaModel.getAllPenyewas();
  const index = penyewas.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Penyewa tidak ditemukan');

  penyewas[index] = {
    ...penyewas[index],
    nama: req.body.nama?.trim() || penyewas[index].nama,
    alamat: req.body.alamat?.trim() || penyewas[index].alamat,
    nomor_telepon: req.body.nomor_telepon?.trim() || penyewas[index].nomor_telepon,
  };

  const fs = require('fs-extra');
  const path = require('path');
  const dataFile = path.join(__dirname, '../data/penyewas.json');
  await fs.writeJSON(dataFile, penyewas, { spaces: 2 });

  res.redirect('/penyewa');
};

// Hapus penyewa
exports.delete = async (req, res) => {
  const penyewas = await penyewaModel.getAllPenyewas();
  const filtered = penyewas.filter(p => p.id !== parseInt(req.params.id));

  const fs = require('fs-extra');
  const path = require('path');
  const dataFile = path.join(__dirname, '../data/penyewas.json');
  await fs.writeJSON(dataFile, filtered, { spaces: 2 });

  res.redirect('/penyewa');
};
