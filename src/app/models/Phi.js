const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhiSchema = new Schema({
    idCanHo: { type: Schema.Types.ObjectId, ref: 'CanHo' },
    loaiPhi: { type: String, enum: ['dien', 'nuoc', 'xemay', 'oto'] },
    soTien: { type: Number },
    trangThai: { type: String, enum: ['chua_dong', 'da_dong'] },
    moTa: { type: String },
    ngayBatDau: { type: Date },
    ngayKetThuc: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Phi', PhiSchema);
