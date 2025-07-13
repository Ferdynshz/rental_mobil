const express = require("express");
const router = express.Router();
const penyewaController = require("../controllers/penyewaController");

// Tampilkan daftar penyewa
router.get("/", penyewaController.index);

// Tampilkan form tambah penyewa
router.get("/create", penyewaController.createForm);

// Proses penyimpanan penyewa baru
router.post("/create", penyewaController.create);

// Tampilkan form edit penyewa
router.get("/:id/edit", penyewaController.editForm);

// Proses update penyewa
router.post('/:id/edit', penyewaController.update);

// Hapus penyewa
router.post("/:id/delete", penyewaController.delete);

// Tampilkan detail penyewa (paling bawah!)
router.get("/:id", penyewaController.show);

module.exports = router;
