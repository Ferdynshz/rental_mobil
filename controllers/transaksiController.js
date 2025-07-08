const fs = require('fs-extra');
const path = require('path');

const transaksiPath = path.join(__dirname, '../data/transaksis.json');
const penyewaPath = path.join(__dirname, '../data/penyewas.json');
const mobilPath = path.join(__dirname, '../data/mobils.json');

// Menampilkan daftar transaksi
exports.index = async (req, res) => {
  const transaksis = await fs.readJSON(transaksiPath);
  const mobils = await fs.readJSON(mobilPath);
  const penyewas = await fs.readJSON(penyewaPath);

  const hasil = transaksis.map(t => {
    const mobil = mobils.find(m => m.id === t.mobilId);
    const penyewa = penyewas.find(p => p.id === t.penyewaId);
    return {
      ...t,
      mobilMerk: mobil?.merk || 'Tidak ditemukan',
      penyewaNama: penyewa?.nama || 'Tidak ditemukan'
    };
  });

  res.render('transaksi/index', { transaksi: hasil });
};

// Form tambah transaksi
exports.createForm = async (req, res) => {
  const mobils = await fs.readJSON(mobilPath);
  const penyewas = await fs.readJSON(penyewaPath);
  res.render('transaksi/create', { mobils, penyewas });
};

// Simpan transaksi baru
exports.create = async (req, res) => {
  const transaksis = await fs.readJSON(transaksiPath);
  const newTransaksi = {
    id: transaksis.length > 0 ? transaksis[transaksis.length - 1].id + 1 : 1,
    mobilId: parseInt(req.body.mobilId),
    penyewaId: parseInt(req.body.penyewaId),
    tanggalSewa: req.body.tanggalSewa,
    tanggalKembali: req.body.tanggalKembali,
    lamaSewa: req.body.lamaSewa,
    totalBiaya: req.body.totalBiaya
  };
  transaksis.push(newTransaksi);
  await fs.writeJSON(transaksiPath, transaksis, { spaces: 2 });
  res.redirect('/transaksi');
};
