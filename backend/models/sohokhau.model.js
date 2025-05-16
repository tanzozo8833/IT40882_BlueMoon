const mongoose = require('mongoose');

const SoHoKhauSchema = new mongoose.Schema({
  idSoHoKhau: { type: String, required: true, unique: true },
  soSoHoKhau: { type: String, required: true },
  chuHo: {
    idNhanKhau: String,
    hoTen: String
  },
  thanhVien: [
    {
      idNhanKhau: String,
      quanHe: String
    }
  ],
  thongTinThem: String,
  diaChi: {
    sonha: String,
    duong: String,
    phuong: String,
    quan: String,
    thanhPho: String
  },
  ngayCap: Date,
  coQuanCap: String,
  hoatDong: { type: Boolean, default: true },
  ghiChu: String
}, { timestamps: true });

module.exports = mongoose.model('SoHoKhau', SoHoKhauSchema);
