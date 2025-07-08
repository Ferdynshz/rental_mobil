const transaksiModel = require('../models/transaksiModel');
const penyewaModel = require('../models/penyewaModel');
const mobilModel = require('../models/mobilModel'); // Asumsikan kamu punya ini

exports.index = (req, res) => {
  const mobils = mobilModel.getAllMobils();       // Ambil semua mobil
  const penyewas = penyewaModel.getAllPenyewas(); // Ambil semua penyewa
  const transaksi = transaksiModel.getDetailTransaksi(mobils, penyewas);
  res.render('transaksi/index', { transaksi });
};

exports.createForm = (req, res) => {
  const mobils = mobilModel.getAllMobils();
  const penyewas = penyewaModel.getAllPenyewas();
  res.render('transaksi/create', { mobils, penyewas });
};

exports.create = (req, res) => {
  const data = {
    mobilId: parseInt(req.body.mobilId),
    penyewaId: parseInt(req.body.penyewaId),
    tanggalSewa: req.body.tanggalSewa,
    tanggalKembali: req.body.tanggalKembali,
    lamaSewa: req.body.lamaSewa,
    totalBiaya: req.body.totalBiaya
  };
  transaksiModel.addTransaksi(data);
  res.redirect('/transaksi');
};
