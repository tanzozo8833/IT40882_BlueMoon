// models/QuyTuThien.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuyTuThienSchema = new Schema({
    tenQuy: { type: String, required: true },
    mota: { type: String },
    trangThai: { type: String, enum: ['Chua bat dau', 'Đang hoạt động', 'Kết thúc'], default: 'Đang hoạt động' },
    ngayBatDau: { type: Date },
    ngayKetThuc: { type: Date },
    slug: { type: String, unique: true, required: true },
}, { timestamps: true });

// Phương thức tính trạng thái thực tế theo ngày
QuyTuThienSchema.methods.tinhTrangThai = function () {
    const now = new Date();
    if (this.ngayBatDau && now < this.ngayBatDau) return 'Chưa bắt đầu';
    if (this.ngayKetThuc && now > this.ngayKetThuc) return 'Kết thúc';
    return 'Đang hoạt động';
};

// Tự động tạo slug từ tenQuy trước khi lưu
QuyTuThienSchema.pre('save', function (next) {
    if (this.isModified('tenQuy') || this.isNew) {
        this.slug = slugify(this.tenQuy, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('QuyTuThien', QuyTuThienSchema);
