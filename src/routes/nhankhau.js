const express = require('express');
const router = express.Router();

const nhankhauController = require('../app/controllers/NhanKhauController');

//Làm mới
//Hiển thị danh sách nhân khẩu
router.get('/', nhankhauController.listNhanKhau);

// Thêm mới nhân khẩu
router.get('/add', nhankhauController.addNhanKhau);
router.post('/add', nhankhauController.createNhanKhau);

// Xem chi tiết nhân khẩu
router.get('/:id', nhankhauController.getNhanKhauById);

// Cập nhật thông tin nhân khẩu
router.post('/:id/update', nhankhauController.updateNhanKhau);

// Xóa nhân khẩu
router.post('/:id/delete', nhankhauController.deleteNhanKhau);

module.exports = router;