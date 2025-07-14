const transaksiModel = require("../models/transaksiModel");

// Tampilkan semua transaksi
exports.index = async (req, res) => {
  const transaksiList = await transaksiModel.getAllTransaksi();
  res.render("transaksi/index", { transaksiList });
};

// Tampilkan form tambah transaksi
exports.createForm = (req, res) => {
  res.render("transaksi/create");
};

// Proses simpan transaksi baru
exports.create = async (req, res) => {
  const {
    id_mobil,
    id_penyewa,
    tanggal_kembali,
    lama_sewa,
    total_biaya
  } = req.body;

  const newTransaksi = {
    id_mobil: parseInt(id_mobil),
    id_penyewa: parseInt(id_penyewa),
    tanggal_kembali,
    lama_sewa: parseInt(lama_sewa),
    total_biaya: parseFloat(total_biaya)
  };

  const result = await transaksiModel.addTransaksi(newTransaksi);
  if (result) {
    res.redirect("/transaksi");
  } else {
    res.status(500).send("Gagal menyimpan transaksi.");
  }
};

// Tampilkan detail transaksi
exports.show = async (req, res) => {
  const transaksi = await transaksiModel.findTransaksiById(req.params.id);
  if (!transaksi) return res.status(404).send("Transaksi tidak ditemukan");
  res.render("transaksi/show", { transaksi });
};
