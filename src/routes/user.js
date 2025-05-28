const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const UserController = require('../app/controllers/UserController');


router.post('/userInfo', userController.postMyInfo);

router.get('/userInfo', userController.viewMyInfo);

router.get('/tuThien', userController.tuthien);

router.get('/listPhiDaDong', UserController.phiDaDong);

router.get('/listPhiChuaDong', UserController.phiChuaDong);

router.get('/:id/chitiet', userController.chitiet);

// Hiển thị form edit
router.get('/:id/edit', userController.edit);

// Xử lý lưu thay đổi (POST)
router.post('/:id/edit', userController.updateNhanKhau);

// Xóa nhân khẩu
router.post('/:id/xoa', userController.deleteNhanKhau);
router.get('/listNhanKhau', userController.listNhanKhau);
router.get('/:email', userController.index);

module.exports = router;