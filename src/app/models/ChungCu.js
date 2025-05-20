const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChungCuSchema = new Schema({
    loai: { type: String },
    phiQuanLi: { type: Number, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ChungCu', ChungCuSchema);
