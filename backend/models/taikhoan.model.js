const mongoose = require('mongoose');

const TaiKhoanSchema = new mongoose.Schema({
  idTaiKhoan:    { type: String, required: true, unique: true },
  idSoHoKhau:    { type: String, default: null },
  email:         { type: String, required: true, unique: true },
  passwordHash:  { type: String, required: true },
  role:          { type: String, enum: ['admin','user','chuho'], default: 'user' },
  fullName:      { type: String },
  lastLogin:     { type: Date },
  isActive:      { type: Boolean, default: true },
  twoFactorEnabled: { type: Boolean, default: false },
  createdAt:     { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('TaiKhoan', TaiKhoanSchema);
