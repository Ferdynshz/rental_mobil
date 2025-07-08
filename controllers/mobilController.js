let mobils = [
  {
    id: 1,
    merk: 'Toyota',
    spesifikasi: 'MPV, 7 penumpang',
    tahun: 2020,
    nomor_polisi: 'B 1234 ABC',
    harga_sewa: 150000
  },
  {
    id: 2,
    merk: 'Honda',
    spesifikasi: 'Sedan, irit bensin',
    tahun: 2019,
    nomor_polisi: 'D 5678 XYZ',
    harga_sewa: 180000
  }
];

// Tampilkan semua mobil
exports.index = (req, res) => {
  res.render('mobil/index', { mobils });
};

// Tampilkan detail mobil
exports.show = (req, res) => {
  const id = parseInt(req.params.id);
  const mobil = mobils.find(m => m.id === id);
  res.render('mobil/show', { mobil });
};

// Form tambah mobil
exports.createForm = (req, res) => {
  res.render('mobil/create');
};

// Simpan data mobil baru
exports.create = (req, res) => {
  const newMobil = {
    id: parseInt(req.body.id),
    merk: req.body.merk,
    spesifikasi: req.body.spesifikasi,
    tahun: parseInt(req.body.tahun),
    nomor_polisi: req.body.nomor_polisi,
    harga_sewa: parseInt(req.body.harga_sewa)
  };

  // Cek apakah ID sudah digunakan
  const existing = mobils.find(m => m.id === newMobil.id);
  if (existing) {
    return res.status(400).send("ID mobil sudah digunakan.");
  }

  mobils.push(newMobil);
  res.redirect('/mobil');
};

// Form edit mobil
exports.editForm = (req, res) => {
  const id = parseInt(req.params.id);
  const mobil = mobils.find(m => m.id === id);
  res.render('mobil/edit', { mobil });
};

// Update data mobil
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const mobil = mobils.find(m => m.id === id);

  if (!mobil) {
    return res.status(404).send("Mobil tidak ditemukan.");
  }

  mobil.merk = req.body.merk;
  mobil.spesifikasi = req.body.spesifikasi;
  mobil.tahun = parseInt(req.body.tahun);
  mobil.nomor_polisi = req.body.nomor_polisi;
  mobil.harga_sewa = parseInt(req.body.harga_sewa);

  res.redirect('/mobil');
};

// Hapus mobil
exports.delete = (req, res) => {
  const id = parseInt(req.params.id);
  mobils = mobils.filter(m => m.id !== id);
  res.redirect('/mobil');
};
