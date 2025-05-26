// models/TuThienPayment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TuThienPaymentSchema = new Schema({
    idTuThienPayment: { type: Number, ref: 'TuThienPayment', index: true, unique: true},
    idQuyTuThien: { type: Number, ref: 'QuyTuThien', required: true },  // Tham chiếu đúng id kiểu Number
    idCanHo: { type: Number, ref: 'CanHo', required: true },
    soTienDaDong: { type: Number, required: true },
    thoiGianDongTien: { type: Date, default: Date.now }
}, {
    timestamps: true,
});

TuThienPaymentSchema.plugin(AutoIncrement, { inc_field: 'idTuThienPayment' });

module.exports = mongoose.model('TuThienPayment', TuThienPaymentSchema);
