const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Trang admin');
});

module.exports = router;