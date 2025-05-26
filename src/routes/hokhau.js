const express = require('express');
const router = express.Router();

const hokhauController = require('../app/controllers/HoKhauController');

//Làm mới
// Hiển thị danh sách hộ khẩu
router.get('/', hokhauController.listHoKhau);

// Thêm mới hộ khẩu
router.get('/add', hokhauController.addHoKhau);
router.post('/add', hokhauController.createHoKhau);

// Xem chi tiết hộ khẩu
router.get('/:id', hokhauController.getHoKhauById);

// Cập nhật thông tin hộ khẩu
router.post('/:id/update', hokhauController.updateHoKhau);

// Xóa hộ khẩu
router.post('/:id/delete', hokhauController.deleteHoKhau);

module.exports = router;