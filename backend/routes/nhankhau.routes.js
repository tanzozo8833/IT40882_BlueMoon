const express = require('express');
const ctrl = require('../controllers/nhankhau.controller');
const router = express.Router();

router.post('/', ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
