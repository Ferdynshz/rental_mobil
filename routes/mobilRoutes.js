const express = require('express');
const router = express.Router();
const mobilController = require('../controllers/mobilController');

router.get('/', mobilController.index);
router.get('/create', mobilController.createForm);
router.post('/create', mobilController.create);
router.get('/:id', mobilController.show);
router.get('/:id/edit', mobilController.editForm);
router.post('/:id/edit', mobilController.update);
router.post('/:id/delete', mobilController.delete);

module.exports = router;
