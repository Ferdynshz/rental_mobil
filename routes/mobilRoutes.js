const express = require('express');
const router = express.Router();
const mobilController = require('../controllers/mobilController');

router.get('/', mobilController.index);
router.get('/create', mobilController.createForm);
router.post('/create', mobilController.create);
router.get('/:id', mobilController.show);
router.get('/:idMobil/edit', mobilController.editForm);
router.post('/:idMobil/edit', mobilController.update);
router.post('/:id/delete', mobilController.delete);

module.exports = router;
