const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const tuthienController = require('../app/controllers/TuThienController');

router.get('/', adminController.index);
//Ke toan
//Thu Phi
router.get('/thuphi', adminController.thuphi);

//Tu thien
const tuthienRouter = require('./tuthien');
router.use('/tuthien', tuthienRouter);

module.exports = router;