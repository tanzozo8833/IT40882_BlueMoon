const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TuThienPaymentSchema = new Schema({
    idTuThienPayment: { type: Schema.Types.ObjectId, ref: 'TuThienPayment' },
    idQuyTuThien: { type: Schema.Types.ObjectId, ref: 'QuyTuThien' },
    idCanHo: { type: Schema.Types.ObjectId, ref: 'CanHo' },
    soTienDaDong: { type: Number },
    thoiGianDongTien: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('TuThienPayment', TuThienPaymentSchema);
