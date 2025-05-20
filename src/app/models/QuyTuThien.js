const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuyTuThienSchema = new Schema({
    idChungCu: { type: Schema.Types.ObjectId, ref: 'ChungCu' },
    batBuoc: { type: Boolean },
    soTien: { type: Number, min: 0 },
    thongTinChiTiet: { type: String },
    ngayBatDau: { type: Date },
    ngayKetThuc: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('QuyTuThien', QuyTuThienSchema);
