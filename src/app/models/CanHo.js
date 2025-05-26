const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CanHoSchema = new Schema({
    idCanHo: { type: Number, unique: true, index: true, ref: 'CanHo' },
    loai: { type: String, enum: ['nhà ở', 'penhouse'] },
    idSoHoKhau: { type: Number, ref: 'SoHoKhau' },
    soXeMay: { type: Number, min: 0, default: 0 },
    soOto: { type: Number, min: 0, default: 0 },
    dienTich: { type: Number , min: 0, required: true },
    trangThai: { type: String, enum: ['trống', 'không trống'], required: true }
}, {
    timestamps: true,
});

CanHoSchema.plugin(AutoIncrement, { inc_field: 'idCanHo' });

module.exports = mongoose.model('CanHo', CanHoSchema);