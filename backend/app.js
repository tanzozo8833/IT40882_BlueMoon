const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/error.middleware');

const nhankhauRoutes = require('./routes/nhankhau.routes');
const sohokhauRoutes = require('./routes/sohokhau.routes');
const chungcuRoutes = require('./routes/chungcu.routes');
const canhoRoutes = require('./routes/canho.routes');
const khoanthuRoutes = require('./routes/khoanthu.routes');
const paymentRoutes = require('./routes/payment.routes');
const taikhoanRoutes = require('./routes/taikhoan.routes');
const auditlogRoutes = require('./routes/auditlog.routes');

const app = express();
app.use(cors());
app.use(express.json());

// mount từng module
app.use('/api/nhankhau', nhankhauRoutes);
app.use('/api/sohokhau', sohokhauRoutes);
app.use('/api/chungcu', chungcuRoutes);
app.use('/api/canho', canhoRoutes);
app.use('/api/khoanthu', khoanthuRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/taikhoan', taikhoanRoutes);
app.use('/api/auditlog', auditlogRoutes);

// error handler
app.use(errorHandler);

module.exports = app;
