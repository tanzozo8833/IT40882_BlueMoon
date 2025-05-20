const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SoHoKhauSchema = new Schema({
    soSoHoKhau: { type: String },
    hoTenChu: { type: String },
    thongTinThem: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SoHoKhau', SoHoKhauSchema);
