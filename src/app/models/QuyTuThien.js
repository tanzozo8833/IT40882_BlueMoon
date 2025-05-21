const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuyTuThienSchema = new Schema({
    idQuyTuThien: { type: Schema.Types.ObjectId, ref: 'QuyTuThien' },
    tenQuy: { type: String, required: true },
    batBuoc: { type: Boolean },
    thongTinChiTiet: { type: String },
    ngayBatDau: { type: Date },
    ngayKetThuc: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('QuyTuThien', QuyTuThienSchema);
