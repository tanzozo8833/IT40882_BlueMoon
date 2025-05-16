const User = require('../models/taikhoan.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register({ email, password, fullName, idSoHoKhau }) {
  // Kiểm tra tồn tại
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error('Email đã được đăng ký');
    err.status = 409;
    throw err;
  }
  // Hash password
  const hash = await bcrypt.hash(password, 10);
  // Tạo user
  const user = await User.create({
    email,
    passwordHash: hash,
    fullName,
    idSoHoKhau,
    role: 'user',
    isActive: true,
    createdAt: new Date()
  });
  return { idTaiKhoan: user._id, email: user.email, fullName: user.fullName };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Không tìm thấy tài khoản');
    err.status = 404;
    throw err;
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    const err = new Error('Sai email hoặc mật khẩu');
    err.status = 401;
    throw err;
  }
  const payload = { sub: user._id, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
  return { token, user: { idTaiKhoan: user._id, email: user.email, role: user.role, fullName: user.fullName } };
}

module.exports = { register, login };
