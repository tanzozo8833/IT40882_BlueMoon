const mongoose = require('mongoose');

const KhoanThuSchema = new mongoose.Schema({
  idKhoanThu: { type: String, required: true, unique: true },
  type: { type: String, enum: ['QUY', 'PHI'], required: true },
  // fields chung
  soTien: Number,
  ngayBatDau: Date,
  ngayKetThuc: Date,
  moTa: String,
  // riêng QUY
  idChungCu: String,
  batBuoc: Boolean,
  chiTiet: String,
  // riêng PHI
  idCanHo: String,
  loaiPhi: String,
  trangThai: String,
  kyPhi: String
}, { timestamps: true });

module.exports = mongoose.model('KhoanThu', KhoanThuSchema);
