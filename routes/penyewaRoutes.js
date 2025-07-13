const express = require("express");
const router = express.Router();
const penyewaController = require("../controllers/penyewaController");


router.get("/", penyewaController.index);
router.get("/create", penyewaController.createForm);
router.post("/create", penyewaController.create);
router.get("/:id/edit", penyewaController.editForm);
router.post('/:id/edit', penyewaController.update);
router.post("/:id/delete", penyewaController.delete);
router.get("/:id", penyewaController.show);

module.exports = router;
