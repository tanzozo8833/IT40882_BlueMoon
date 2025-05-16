const mongoose = require('mongoose');

const CanHoSchema = new mongoose.Schema({
  idCanHo: { type: String, required: true, unique: true },
  idChungCu: String,
  idSoHoKhau: String,
  soXeMay: Number,
  soOTo: Number,
  dienTich: Number,
  tang: Number,
  huong: String,
  trangThai: String,
  thoiGianThue: {
    batDau: Date,
    ketThuc: Date
  },
  ghiChu: String
}, { timestamps: true });

module.exports = mongoose.model('CanHo', CanHoSchema);
