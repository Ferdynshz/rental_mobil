const transaksiModel = require('../models/transaksiModel');
const penyewaModel = require('../models/penyewaModel');
const mobilModel = require('../models/mobilModel'); 

// TAMPILKAN SEMUA TRANSAKSI
exports.index = async (req, res) => {
  try {
    const mobils = await mobilModel.getAllMobils();      
    const penyewas = await penyewaModel.getAllPenyewas(); 
    const transaksi = await transaksiModel.getDetailTransaksi(mobils, penyewas); 
    res.render('transaksi/index', { transaksi });
  } catch (err) {
    console.error('Gagal memuat data transaksi:', err);
    res.status(500).send('Terjadi kesalahan saat memuat transaksi.');
  }
};

// FORM INPUT TRANSAKSI BARU
exports.createForm = async (req, res) => {
  try {
    const penyewas = await penyewaModel.getAllPenyewas();
    const mobils = await mobilModel.getAllMobils();
    res.render('transaksi/create', { penyewas, mobils });
  } catch (err) {
    console.error('Gagal memuat form:', err);
    res.status(500).send('Terjadi kesalahan saat memuat form transaksi.');
  }
};

// PROSES SIMPAN TRANSAKSI BARU
exports.create = async (req, res) => {
  try {
    const data = {
      mobilId: parseInt(req.body.mobilId),
      penyewaId: parseInt(req.body.penyewaId),
      tanggalSewa: req.body.tanggalSewa,
      tanggalKembali: req.body.tanggalKembali,
      lamaSewa: req.body.lamaSewa,
      totalBiaya: req.body.totalBiaya
    };
    await transaksiModel.addTransaksi(data); 
    res.redirect('/transaksi');
  } catch (err) {
    console.error('Gagal menambahkan transaksi:', err);
    res.status(500).send('Terjadi kesalahan saat menambahkan transaksi.');
  }
};
