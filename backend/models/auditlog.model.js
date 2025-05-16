const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  logId:            { type: String, required: true, unique: true },
  idTaiKhoan:       { type: String, required: true },
  changeType:       { type: String, enum: ['CREATE','UPDATE','DELETE'], required: true },
  description:      { type: String },
  targetCollection: { type: String },
  targetId:         { type: String },
  timestamp:        { type: Date, default: Date.now },
  ipAddress:        { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
