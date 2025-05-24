const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const tuthienController = require('../app/controllers/TuThienController');

router.get('/', adminController.index);
//Ke toan
//Thu Phi
router.get('/thuphi', adminController.thuphi);
//Dong Gop
router.get('/tuthien', tuthienController.show);
router.get('/tuthien/them', tuthienController.them);



module.exports = router;