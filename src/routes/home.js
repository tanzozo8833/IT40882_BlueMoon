const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

// [GET] /
router.get('/', homeController.index);
// [GET] /search
router.get('/search', homeController.search);

module.exports = router;