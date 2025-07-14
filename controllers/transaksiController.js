const transaksiModel = require("../models/transaksiModel");
const mobilModel = require("../models/mobilModel");
const penyewaModel = require("../models/penyewaModel");

exports.index = async (req, res) => {
  const transaksiList = await transaksiModel.getAllTransaksi();
  const daftarMobil = await mobilModel.getAll();
  const daftarPenyewa = await penyewaModel.getAllPenyewas();

  const transaksiWithJoin = transaksiList.map((transaksi) => {
    const mobil = daftarMobil.find((m) => m.IdMobil === transaksi.IdMobil);
    const penyewa = daftarPenyewa.find(
      (p) => p.IdPenyewa === transaksi.IdPenyewa
    );

    return {
      ...transaksi,
      mobilMerk: mobil ? mobil.merk : "Mobil tidak ditemukan",
      penyewaNama: penyewa ? penyewa.nama : "Penyewa tidak ditemukan",
    };
  });

  res.render("transaksi/index", { transaksiList: transaksiWithJoin });
};

exports.createForm = async (req, res) => {
  const daftarMobil = await mobilModel.getAll();
  const daftarPenyewa = await penyewaModel.getAllPenyewas();
  console.log("Isi daftarMobil:", daftarMobil);
  console.log("Isi daftarPenyewa:", daftarPenyewa);
  res.render("transaksi/create", { daftarMobil, daftarPenyewa });
};

exports.create = async (req, res) => {
  const { idMobil, idPenyewa, tanggal_sewa, tanggal_kembali, lama_sewa, total_biaya } =
    req.body;

  console.log("Isi req.body:", req.body);

  if (!idMobil || !idPenyewa) {
    console.error("❌ Mobil atau Penyewa belum dipilih.");
    return res.status(400).send("Mobil dan Penyewa wajib dipilih.");
  }

  const newTransaksi = {
    id_mobil: parseInt(idMobil),
    id_penyewa: parseInt(idPenyewa),
    tanggal_sewa,
    tanggal_kembali,
    lama_sewa: parseInt(lama_sewa),
    total_biaya: parseFloat(total_biaya),
  };

  console.log("Data yang akan dikirim ke model:", newTransaksi);

  const result = await transaksiModel.addTransaksi(newTransaksi);
  if (result) {
    res.redirect("/transaksi");
  } else {
    res.status(500).send("Gagal menyimpan transaksi.");
  }
};

exports.show = async (req, res) => {
  const transaksi = await transaksiModel.findTransaksiById(req.params.id);
  if (!transaksi) return res.status(404).send("Transaksi tidak ditemukan");
  res.render("transaksi/show", { transaksi });
};
