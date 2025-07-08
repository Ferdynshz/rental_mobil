const express = require('express');
const router = express.Router();
const penyewaController = require('../controllers/penyewaController');

// Tampilkan daftar penyewa
router.get('/', penyewaController.index);

// Tampilkan form tambah penyewa
router.get('/create', penyewaController.createForm);

// Proses penyimpanan penyewa baru
router.post('/create', penyewaController.create);

// Tampilkan detail penyewa
router.get('/:id', penyewaController.show);

// Tampilkan form edit penyewa
router.get('/:id/edit', penyewaController.editForm);

// Proses update penyewa
router.post('/:id/edit', penyewaController.update);

// Hapus penyewa
router.post('/:id/delete', penyewaController.delete);

module.exports = router;
