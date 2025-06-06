const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PhiSchema = new Schema({
    idPhi: { type: Number, ref: 'Phi' },
    idCanHo: { type: Number, ref: 'CanHo' },
    loaiPhi: { type: String, enum: ['dien', 'nuoc', 'xemay', 'oto', 'Phi dich vu nha o', 'Phi dich vu cao cap', 'Phi quan ly'] },
    soTien: { type: Number },
    trangThai: { type: String, enum: ['chua_dong', 'da_dong'] },
    moTa: { type: String },
    thang: { type: Number, min: 1, max: 12 },
    nam: { type: Number, min: 2000, max: 2100 },
}, { timestamps: true });

PhiSchema.plugin(AutoIncrement, { inc_field: 'idPhi' });

module.exports = mongoose.model('Phi', PhiSchema);
