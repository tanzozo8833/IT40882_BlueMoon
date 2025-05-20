const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    idPhi: { type: Schema.Types.ObjectId, ref: 'Phi' },
    idCanHo: { type: Schema.Types.ObjectId, ref: 'CanHo' },
    soTienDaDong: { type: Number },
    thoiGianDongTien: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
