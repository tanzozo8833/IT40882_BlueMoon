const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Trang nhan vien');
});

module.exports = router;