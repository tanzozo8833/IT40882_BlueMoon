const express = require('express');
const router = express.Router();

const canhoController = require('../app/controllers/CanHoController');

//Làm mới
// Hiển thị danh sách căn hộ
router.get('/', canhoController.listCanHo);

// Thêm mới căn hộ
router.get('/add', canhoController.addCanHo);
router.post('/add', canhoController.createCanHo);

// Xem chi tiết căn hộ
router.get('/:id', canhoController.getCanHoById);

// Cập nhật thông tin căn hộ
router.post('/:id/update', canhoController.updateCanHo);

// Xóa căn hộ
router.get('/:id/delete', canhoController.deleteCanHo);

module.exports = router;