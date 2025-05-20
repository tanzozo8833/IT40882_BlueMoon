const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditLogSchema = new Schema({
    idTaiKhoan: { type: Schema.Types.ObjectId, ref: 'TaiKhoan' },
    loaiThayDoi: { type: String },
    moTa: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
