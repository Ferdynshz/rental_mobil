const mobilModel = require("../models/mobilModel");

// Tampilkan semua mobil
exports.index = async (req, res) => {
  const mobils = await mobilModel.getAll();
  console.log({ mobils });
  res.render("mobil/index", { mobils });
};

// Tampilkan detail mobil berdasarkan ID
exports.show = async (req, res) => {
  const mobil = await mobilModel.getById(parseInt(req.params.id));
  if (!mobil) return res.status(404).send("Mobil tidak ditemukan");
  res.render("mobil/show", { mobil });
};

// Form tambah mobil
exports.createForm = (req, res) => {
  res.render("mobil/create");
};

// Simpan mobil baru
exports.create = async (req, res) => {
  const { idMobil, merk, spesifikasi, tahun, nomorPolisi, hargaSewaPerHari } =
    req.body;

  if (
    !idMobil ||
    !merk ||
    !spesifikasi ||
    !tahun ||
    !nomorPolisi ||
    !hargaSewaPerHari
  ) {
    return res.status(400).send("Semua data wajib diisi");
  }

  const existing = await mobilModel.getById(parseInt(idMobil));
  if (existing) return res.status(400).send("ID sudah digunakan");

  const newMobil = {
    idMobil: parseInt(idMobil),
    merk: merk.trim(),
    spesifikasi: spesifikasi.trim(),
    tahun: parseInt(tahun),
    nomorPolisi: nomorPolisi.trim(),
    hargaSewaPerHari: parseInt(hargaSewaPerHari),
  };

  await mobilModel.add(newMobil);
  res.redirect("/mobil");
};

// Form edit mobil
exports.editForm = async (req, res) => {
  const id = parseInt(req.params.idMobil);
  const mobil = await mobilModel.getById(id);

  if (!mobil) {
    return res.status(404).send("Mobil tidak ditemukan");
  }

  res.render("mobil/edit", { mobil });
};


// Update mobil
exports.update = async (req, res) => {
  const id = parseInt(req.params.idMobil);
  const newData = {
    idMobil: id,
    merk: req.body.merk?.trim(),
    spesifikasi: req.body.spesifikasi?.trim(),
    tahun: parseInt(req.body.tahun),
    nomorPolisi: req.body.nomorPolisi?.trim(),
    hargaSewaPerHari: parseInt(req.body.hargaSewaPerHari),
  };

  const updated = await mobilModel.update(id, newData);
  console.log(`UPDATE: ${updated}`);
  if (!updated) return res.status(404).send("Mobil tidak ditemukan");

  res.redirect("/mobil");
};

// Hapus mobil
exports.delete = async (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = await mobilModel.delete(id);

  // Cek kalau request gagal atau error
  if (deleted === false || deleted === null || deleted === undefined) {
    return res.status(404).send("Mobil tidak ditemukan");
  }

  res.redirect("/mobil");
};
