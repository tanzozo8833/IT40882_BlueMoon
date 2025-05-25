const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const NhanKhauSchema = new Schema({
    ID: {
        type: Number,
        unique: true,
        required: true,
        index: true,
        ref: 'NhanKhau'
    },
    idSoHoKhau: {
        type: Number,
        ref: 'SoHoKhau',
        required: true,
        index: true
    },
    quanHeVoiChuHo: { type: String, trim: true },
    hoTen: { type: String, required: true, trim: true, index: true },
    biDanh: { type: String, trim: true },
    ngaySinh: { type: Date, required: true },
    noiSinh: { type: String, trim: true },
    queQuan: { type: String, trim: true },
    danToc: { type: String, trim: true },
    ngheNghiep: { type: String, trim: true },
    noiLamViec: { type: String, trim: true },
    soCCCD: {
        type: String,
        trim: true,
        unique: true,
        match: [/^[0-9]{12}$/, 'CCCD phải gồm đúng 12 chữ số']
    },
    ngayCap: { type: Date },
    noiCap: { type: String, trim: true },
    trangThai: { type: String, trim: true },
    thongTinKhac: { type: String, trim: true },
}, {
    timestamps: true
});

NhanKhauSchema.plugin(AutoIncrement, { inc_field: 'ID' });

module.exports = mongoose.model('NhanKhau', NhanKhauSchema);
