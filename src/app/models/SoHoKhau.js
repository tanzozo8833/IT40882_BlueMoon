const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SoHoKhauSchema = new Schema({
    idSoHoKhau: { type: Schema.Types.ObjectId, ref: 'SoHoKhau' },
    soSoHoKhau: { type: String , required: true, unique: true, trim: true },
    hoTenChu: { type: String, trim: true , index : true },
    thongTinThem: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('SoHoKhau', SoHoKhauSchema);
