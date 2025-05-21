const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CanHoSchema = new Schema({
    idCanHo: { type: Schema.Types.ObjectId, ref: 'CanHo' },
    loai: { type: String, enum: ['nhà ở', 'penhouse'] },
    idSoHoKhau: { type: Schema.Types.ObjectId, ref: 'SoHoKhau' },
    soXeMay: { type: Number, min: 0 },
    soOto: { type: Number, min: 0 },
    dienTich: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('CanHo', CanHoSchema);
