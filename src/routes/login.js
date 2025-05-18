const express = require('express');
const router = express.Router();

// Import the controller
const loginController = require('../app/controllers/LoginController');

router.get('/', loginController.viewlogin);
router.post('/', loginController.postLogin);

module.exports = router;