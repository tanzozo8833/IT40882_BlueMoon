const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhanKhauSoHoKhauSchema = new Schema({
    idNhanKhau: { type: Schema.Types.ObjectId, ref: 'NhanKhau' },
    idSoHoKhau: { type: Schema.Types.ObjectId, ref: 'SoHoKhau' }
});

module.exports = mongoose.model('NhanKhau_SoHoKhau', NhanKhauSoHoKhauSchema);
