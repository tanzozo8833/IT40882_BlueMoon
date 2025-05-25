const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CanHoSchema = new Schema({
    idCanHo: { type: Number, ref: 'CanHo' },
    loai: { type: String, enum: ['nhà ở', 'penhouse'] },
    idSoHoKhau: { type: Schema.Types.ObjectId, ref: 'SoHoKhau' },
    soXeMay: { type: Number, min: 0 },
    soOto: { type: Number, min: 0 },
    dienTich: { type: Number }
}, {
    timestamps: true,
    _id: false // Không sử dụng trường _id tự động của Mongoose
});


CanHoSchema.plugin(AutoIncrement, { inc_field: 'idCanHo' });

module.exports = mongoose.model('CanHo', CanHoSchema);
