const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SoHoKhauSchema = new Schema({
    idSoHoKhau: { type: Number, unique: true, index: true, ref: 'SoHoKhau' },
    soSoHoKhau: { type: String , required: true, unique: true, trim: true },
    hoTenChu: { type: String, trim: true , index : true },
    thongTinThem: { type: String, trim: true }
}, { timestamps: true });

SoHoKhauSchema.plugin(AutoIncrement, { inc_field: 'idSoHoKhau' });

module.exports = mongoose.model('SoHoKhau', SoHoKhauSchema);
