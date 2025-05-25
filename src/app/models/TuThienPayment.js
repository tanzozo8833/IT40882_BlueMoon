// models/TuThienPayment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TuThienPaymentSchema = new Schema({
    _idTuThienPayment: { type: Number },
    idQuyTuThien: { type: Number, ref: 'QuyTuThien', required: true },  // Tham chiếu đúng _id kiểu Number
    idCanHo: { type: Number, ref: 'CanHo', required: true },
    soTienDaDong: { type: Number, required: true },
    thoiGianDongTien: { type: Date, default: Date.now }
}, {
    timestamps: true,
});

TuThienPaymentSchema.plugin(AutoIncrement, { inc_field: '_idTuThienPayment' });

module.exports = mongoose.model('TuThienPayment', TuThienPaymentSchema);
