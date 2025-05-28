const express = require('express');
const router = express.Router();

const thuphiController = require('../app/controllers/ThuPhiController');
const { model } = require('mongoose');

// Danh sách thu phí
router.get('/', thuphiController.show);
router.get('/:loaiPhi/:thang/:nam', thuphiController.chiTiet);

router.put('/:loaiPhi/:thang/:nam/:idCanHo/dongtien', thuphiController.dongtien);
module.exports = router;