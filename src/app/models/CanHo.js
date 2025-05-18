const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CanHoSchema = new Schema({
    idChungCu: { type: Schema.Types.ObjectId, ref: 'ChungCu' },
    idSoHoKhau: { type: Schema.Types.ObjectId, ref: 'SoHoKhau' },
    soXeMay: { type: Number, min: 0 },
    soOto: { type: Number, min: 0 },
    dienTich: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('CanHo', CanHoSchema);
