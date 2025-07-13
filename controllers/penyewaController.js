const penyewaModel = require("../models/penyewaModel");

// Tampilkan daftar penyewa
exports.index = async (req, res) => {
  try {
    const penyewas = await penyewaModel.getAllPenyewas();
    res.render("penyewa/index", { penyewas });
  } catch (error) {
    console.error("Gagal mengambil daftar penyewa:", error.message);
    res.status(500).send("Terjadi kesalahan saat mengambil data penyewa");
  }
};

// Tampilkan detail penyewa
exports.show = async (req, res) => {
  const penyewa = await penyewaModel.findPenyewaById(parseInt(req.params.id));
  if (!penyewa) return res.status(404).send("Penyewa tidak ditemukan");
  res.render("penyewa/show", { penyewa });
};

// Form untuk tambah penyewa
exports.createForm = (req, res) => {
  res.render("penyewa/create");
};

// Simpan penyewa baru
exports.create = async (req, res) => {
  const { Nama, Alamat, NomorTelepon } = req.body;
  if (!Nama || !Alamat || !NomorTelepon) {
    return res.status(400).send("Semua data wajib diisi");
  }

  const newPenyewa = {
    Nama: Nama.trim(),
    Alamat: Alamat.trim(),
    NomorTelepon: NomorTelepon.trim(),
  };

  await penyewaModel.addPenyewa(newPenyewa);
  res.redirect("/penyewa");
};

// Form untuk edit penyewa
exports.editForm = async (req, res) => {
  const penyewa = await penyewaModel.findPenyewaById(parseInt(req.params.id));
  console.log("Data penyewa yang dikirim ke view:", penyewa);
  if (!penyewa) return res.status(404).send("Penyewa tidak ditemukan");
  res.render("penyewa/edit", { penyewa });
};

// Proses update data penyewa
exports.update = async (req, res) => {
  const id = req.params.id;
  const { Nama, Alamat, NomorTelepon } = req.body;

  console.log(" Update penyewa ID:", id);
  console.log(" Data dari form:", req.body);

  try {
    penyewaModel.updatePenyewa(id, { Nama, Alamat, NomorTelepon });
    res.redirect("/penyewa");
  } catch (error) {
    console.error(" Gagal update penyewa:", error.message);
    res.status(500).send("Gagal update data penyewa.");
  }
};

// Hapus penyewa
exports.delete = async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = await penyewaModel.deletePenyewa(id);
  if (!deleted) return res.status(404).send("Penyewa tidak ditemukan");
  res.redirect("/penyewa");
};
