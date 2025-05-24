const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// [GET] /
router.get('/', userController.index);


module.exports = router;