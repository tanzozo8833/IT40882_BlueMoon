const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaiKhoanSchema = new Schema({
    idSoHoKhau: { type: Schema.Types.ObjectId, ref: 'SoHoKhau' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'nhanvien'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('TaiKhoan', TaiKhoanSchema);
