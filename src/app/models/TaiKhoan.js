const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaiKhoanSchema = new Schema({
    idSoHoKhau: { type: Schema.Types.ObjectId, ref: 'SoHoKhau' },
    idTaiKhoan: { type: Schema.Types.ObjectId, ref: 'TaiKhoan' },
    email: { type: String, required: true, unique: true, trim: true },
    tenDangNhap: { type: String, required: true, unique: true, trim: true },
    hoTen: { type: String, required: true, trim: true, index: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ['admin', 'user'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('TaiKhoan', TaiKhoanSchema);
