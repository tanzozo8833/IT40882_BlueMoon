const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/', adminController.index);
//Ke toan
//Thu Phi
const thuPhiRouter = require('./thuphi');
router.use('/thuphi', thuPhiRouter);

//Tu thien
const tuthienRouter = require('./tuthien');
router.use('/tuthien', tuthienRouter);

//To Truong
//Quan ly nhan khau
const nhankhauRouter = require('./nhankhau');
router.use('/nhankhau', nhankhauRouter);

//Quan ly ho khau
const hokhauRouter = require('./hokhau');
router.use('/hokhau', hokhauRouter);

//Quan ly tai khoan
const taikhoanRouter = require('./taikhoan');
router.use('/taikhoan', taikhoanRouter);

//Quan ly can ho
const canhoRouter = require('./canho');
router.use('/canho', canhoRouter);
module.exports = router;