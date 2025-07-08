const mobilModel = require('../models/mobilModel');

// Tampilkan semua mobil
exports.index = async (req, res) => {
  const mobils = await mobilModel.getAllMobils();
  res.render('mobil/index', { mobils });
};

// Tampilkan detail mobil berdasarkan ID
exports.show = async (req, res) => {
  const mobil = await mobilModel.findMobilById(parseInt(req.params.id));
  if (!mobil) return res.status(404).send('Mobil tidak ditemukan');
  res.render('mobil/show', { mobil });
};

// Form tambah mobil
exports.createForm = (req, res) => {
  res.render('mobil/create');
};

// Simpan mobil baru
exports.create = async (req, res) => {
  const { id, merk, spesifikasi, tahun, nomor_polisi, harga_sewa } = req.body;

  if (!id || !merk || !spesifikasi || !tahun || !nomor_polisi || !harga_sewa) {
    return res.status(400).send('Semua data wajib diisi');
  }

  const existing = await mobilModel.findMobilById(parseInt(id));
  if (existing) return res.status(400).send('ID sudah digunakan');

  const newMobil = {
    id: parseInt(id),
    merk: merk.trim(),
    spesifikasi: spesifikasi.trim(),
    tahun: parseInt(tahun),
    nomor_polisi: nomor_polisi.trim(),
    harga_sewa: parseInt(harga_sewa)
  };

  await mobilModel.addMobil(newMobil);
  res.redirect('/mobil');
};

// Form edit mobil
exports.editForm = async (req, res) => {
  const mobil = await mobilModel.findMobilById(parseInt(req.params.id));
  if (!mobil) return res.status(404).send('Mobil tidak ditemukan');
  res.render('mobil/edit', { mobil });
};

// Update mobil
exports.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = {
    merk: req.body.merk?.trim(),
    spesifikasi: req.body.spesifikasi?.trim(),
    tahun: parseInt(req.body.tahun),
    nomor_polisi: req.body.nomor_polisi?.trim(),
    harga_sewa: parseInt(req.body.harga_sewa)
  };

  const updated = await mobilModel.updateMobil(id, newData);
  if (!updated) return res.status(404).send('Mobil tidak ditemukan');

  res.redirect('/mobil');
};

// Hapus mobil
exports.delete = async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = await mobilModel.deleteMobil(id);
  if (!deleted) return res.status(404).send('Mobil tidak ditemukan');

  res.redirect('/mobil');
};
