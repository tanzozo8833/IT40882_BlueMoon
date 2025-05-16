const mongoose = require('mongoose');

const NhanKhauSchema = new mongoose.Schema({
  idNhanKhau: { type: String, required: true, unique: true },
  hoTen: String,
  biDanh: String,
  dob: Date,
  noiSinh: String,
  queQuan: String,
  danToc: String,
  ngheNghiep: String,
  noiLamViec: String,
  soCCCD: String,
  ngayCapCCCD: Date,
  noiCapCCCD: String,
  trangThai: String,
  thongTinKhac: String,
  gioiTinh: String,
  soDienThoai: String,
  email: String,
  ngayDangKy: Date,
}, { timestamps: true });

module.exports = mongoose.model('NhanKhau', NhanKhauSchema);
