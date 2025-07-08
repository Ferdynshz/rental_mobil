let transaksi = [];

const mobils = [
  { id: 1, merk: 'Toyota' },
  { id: 2, merk: 'Honda' }
];

const penyewas = [
  { id: 1, nama: 'Budi' },
  { id: 2, nama: 'Siti' }
];

exports.index = (req, res) => {
  const hasil = transaksi.map(t => {
    const mobil = mobils.find(m => m.id === t.mobilId);
    const penyewa = penyewas.find(p => p.id === t.penyewaId);
    return {
      ...t,
      mobilMerk: mobil?.merk,
      penyewaNama: penyewa?.nama
    };
  });

  res.render('transaksi/index', { transaksi: hasil });
};

exports.createForm = (req, res) => {
  res.render('transaksi/create', { mobils, penyewas });
};

exports.create = (req, res) => {
  const newTransaksi = {
    id: transaksi.length + 1,
    mobilId: parseInt(req.body.mobilId),
    penyewaId: parseInt(req.body.penyewaId),
    tanggalSewa: req.body.tanggalSewa,
    tanggalKembali: req.body.tanggalKembali
  };
  transaksi.push(newTransaksi);
  res.redirect('/transaksi');
};
