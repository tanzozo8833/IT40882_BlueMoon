const express = require('express');
const router = express.Router();

// Import the controller
const loginController = require('../app/controllers/LoginController');

// [GET] /login
router.get('/', loginController.viewlogin);
// [POST] /login
router.post('/login', loginController.postLogin);

module.exports = router;