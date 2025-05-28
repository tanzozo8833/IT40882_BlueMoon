const express = require('express');
const router = express.Router();

const thongkeController = require('../app/controllers/ThongKeController');

//Làm mới
// Hiển thị danh sách tài khoản
router.post('/', thongkeController.postFilter);
router.get('/', thongkeController.listCanHo);

router.get('/:idCanHo', thongkeController.detailCanHo);
module.exports = router;