const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');

router.get('/', transaksiController.index);
router.get('/create', transaksiController.createForm);
router.post('/create', transaksiController.create);

module.exports = router;
