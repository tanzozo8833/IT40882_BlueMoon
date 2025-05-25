const express = require('express');
const router = express.Router();

const taikhoanController = require('../app/controllers/TaiKhoanController');

//Làm mới
// Hiển thị danh sách tài khoản
router.get('/', taikhoanController.listTaiKhoan);
router.post('/', taikhoanController.updateTaiKhoan);

// Thêm mới tài khoản
router.get('/add', taikhoanController.addTaiKhoan);
router.post('/add', taikhoanController.createTaiKhoan);

// Xóa tài khoản
router.post('/:id', taikhoanController.deleteTaiKhoan);

module.exports = router;