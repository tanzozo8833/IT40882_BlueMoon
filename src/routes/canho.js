const express = require('express');
const router = express.Router();

const canhoController = require('../app/controllers/CanHoController');

//Làm mới
// Hiển thị danh sách căn hộ
router.get('/', canhoController.listCanHo);

// Xem chi tiết căn hộ
router.get('/:id', canhoController.getCanHoById);

// Cập nhật thông tin căn hộ
router.post('/:id/update', canhoController.updateCanHo);

module.exports = router;