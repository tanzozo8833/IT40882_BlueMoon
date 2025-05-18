const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhanKhauSchema = new Schema({
    hoTen: { type: String, required: true },
    biDanh: { type: String },
    ngaySinh: { type: Date, required: true },
    noiSinh: { type: String },
    queQuan: { type: String },
    danToc: { type: String },
    ngheNghiep: { type: String },
    noiLamViec: { type: String },
    soCCCD: { type: String },
    ngayCap: { type: Date },
    noiCap: { type: String },
    trangThai: { type: String },
    thongTinKhac: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('NhanKhau', NhanKhauSchema);
