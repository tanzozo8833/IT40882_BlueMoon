const express = require('express');
const router = express.Router();

const thuphiController = require('../app/controllers/ThuPhiController');
const { model } = require('mongoose');

// Danh sách thu phí
router.get('/', thuphiController.show);

module.exports = router;