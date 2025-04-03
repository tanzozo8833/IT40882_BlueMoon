const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cấu hình biến môi trường
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/apartments', require('./routes/apartment.routes'));
app.use('/api/residents', require('./routes/resident.routes'));
app.use('/api/payments', require('./routes/payment.routes'));
app.use('/api/maintenance', require('./routes/maintenance.routes'));

// Route mặc định
app.get('/', (req, res) => {
  res.json({ message: 'Chào mừng đến với API Quản lý Căn hộ' });
});

// Xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Đã xảy ra lỗi!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Khởi động server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}.`);
});