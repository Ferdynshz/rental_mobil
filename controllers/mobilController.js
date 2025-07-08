let mobils = [
    { id: 1, merk: 'Toyota', tahun: 2020 },
    { id: 2, merk: 'Honda', tahun: 2019 }
];

exports.index = (req, res) => {
    res.render('mobil/index', { mobils });
};

exports.show = (req, res) => {
    const id = parseInt(req.params.id);
    const mobil = mobils.find(m => m.id === id);
    res.render('mobil/show', { mobil });
};

exports.createForm = (req, res) => {
    res.render('mobil/create');
};

exports.create = (req, res) => {
    const newMobil = {
        id: mobils.length + 1,
        merk: req.body.merk,
        tahun: req.body.tahun
    };
    mobils.push(newMobil);
    res.redirect('/mobil');
};

exports.editForm = (req, res) => {
    const id = parseInt(req.params.id);
    const mobil = mobils.find(m => m.id === id);
    res.render('mobil/edit', { mobil });
};

exports.update = (req, res) => {
    const id = parseInt(req.params.id);
    const mobil = mobils.find(m => m.id === id);
    mobil.merk = req.body.merk;
    mobil.tahun = req.body.tahun;
    res.redirect('/mobil');
};

exports.delete = (req, res) => {
    mobils = mobils.filter(m => m.id !== parseInt(req.params.id));
    res.redirect('/mobil');
};
