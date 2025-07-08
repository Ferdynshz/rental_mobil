const fs = require('fs-extra');
const path = require('path');

const dataFile = path.join(__dirname, '../data/mobils.json');

// Fungsi bantu untuk load data
async function loadMobils() {
  return await fs.readJSON(dataFile);
}

// Fungsi bantu untuk simpan data
async function saveMobils(mobils) {
  await fs.writeJSON(dataFile, mobils, { spaces: 2 });
}

// Tampilkan daftar mobil
exports.index = async (req, res) => {
  const mobils = await loadMobils();
  res.render('mobil/index', { mobils });
};

// Tampilkan detail mobil
exports.show = async (req, res) => {
  const mobils = await loadMobils();
  const mobil = mobils.find(m => m.id === parseInt(req.params.id));
  if (!mobil) return res.status(404).send('Mobil tidak ditemukan');
  res.render('mobil/show', { mobil });
};

// Form tambah mobil
exports.createForm = (req, res) => {
  res.render('mobil/create');
};

// Simpan mobil baru
exports.create = async (req, res) => {
  const mobils = await loadMobils();
  const {
    id, merk, spesifikasi, tahun, nomor_polisi, harga_sewa
  } = req.body;

  if (!id || !merk || !spesifikasi || !tahun || !nomor_polisi || !harga_sewa) {
    return res.status(400).send('Semua data wajib diisi');
  }

  const existing = mobils.find(m => m.id === parseInt(id));
  if (existing) {
    return res.status(400).send('ID mobil sudah digunakan');
  }

  const newMobil = {
    id: parseInt(id),
    merk: merk.trim(),
    spesifikasi: spesifikasi.trim(),
    tahun: parseInt(tahun),
    nomor_polisi: nomor_polisi.trim(),
    harga_sewa: parseInt(harga_sewa)
  };

  mobils.push(newMobil);
  await saveMobils(mobils);
  res.redirect('/mobil');
};

// Form edit mobil
exports.editForm = async (req, res) => {
  const mobils = await loadMobils();
  const mobil = mobils.find(m => m.id === parseInt(req.params.id));
  if (!mobil) return res.status(404).send('Mobil tidak ditemukan');
  res.render('mobil/edit', { mobil });
};

// Update mobil
exports.update = async (req, res) => {
  const mobils = await loadMobils();
  const mobil = mobils.find(m => m.id === parseInt(req.params.id));
  if (!mobil) return res.status(404).send('Mobil tidak ditemukan');

  mobil.merk = req.body.merk?.trim() || mobil.merk;
  mobil.spesifikasi = req.body.spesifikasi?.trim() || mobil.spesifikasi;
  mobil.tahun = parseInt(req.body.tahun) || mobil.tahun;
  mobil.nomor_polisi = req.body.nomor_polisi?.trim() || mobil.nomor_polisi;
  mobil.harga_sewa = parseInt(req.body.harga_sewa) || mobil.harga_sewa;

  await saveMobils(mobils);
  res.redirect('/mobil');
};

// Hapus mobil
exports.delete = async (req, res) => {
  let mobils = await loadMobils();
  mobils = mobils.filter(m => m.id !== parseInt(req.params.id));
  await saveMobils(mobils);
  res.redirect('/mobil');
};
