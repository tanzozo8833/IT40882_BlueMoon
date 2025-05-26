const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TaiKhoanSchema = new Schema({
    idSoHoKhau: { type: Number, ref: 'SoHoKhau' },
    idTaiKhoan: { type: Number, ref: 'TaiKhoan', index: true, unique: true },
    email: { type: String, required: true, unique: true, trim: true },
    tenDangNhap: { type: String, required: true, unique: true, trim: true },
    hoTen: { type: String, required: true, trim: true, index: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'user'], required: true }
}, { timestamps: true });

TaiKhoanSchema.plugin(AutoIncrement, { inc_field: 'idTaiKhoan' });

module.exports = mongoose.model('TaiKhoan', TaiKhoanSchema);
