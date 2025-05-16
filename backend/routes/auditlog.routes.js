const express = require('express');
const ctrl = require('../controllers/auditlog.controller');
const router = express.Router();

router.post('/', ctrl.create);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.delete('/:id', ctrl.remove);

module.exports = router;
