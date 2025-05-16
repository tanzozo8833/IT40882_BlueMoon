const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  idPayment: { type: String, required: true, unique: true },
  idKhoanThu: String,
  idCanHo: String,
  thoiGianDong: Date,
  soTienDong: Number,
  phuongThuc: String,
  maGiaoDich: String,
  nguoiThu: String,
  ghiChu: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
