const express = require('express');
const router = express.Router();

// Import the controller
const loginController = require('../app/controllers/LoginController');

router.get('/', loginController.viewMyInfo);
router.post('/', loginController.postMyInfo);

module.exports = router;