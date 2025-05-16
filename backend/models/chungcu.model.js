const mongoose = require('mongoose');

const ChungCuSchema = new mongoose.Schema({
  idChungCu: { type: String, required: true, unique: true },
  loai: String,
  phiQuanLy: Number,
  tenChungCu: String,
  diaChi: String,
  soTang: Number,
  chuDauTu: String,
  lienHe: {
    hotline: String,
    email: String
  }
}, { timestamps: true });

module.exports = mongoose.model('ChungCu', ChungCuSchema);
