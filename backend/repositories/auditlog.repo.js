const AuditLog = require('../models/auditlog.model');

async function create(data) {
  return AuditLog.create(data);
}

async function findAll(filter = {}) {
  return AuditLog.find(filter);
}

async function findById(id) {
  return AuditLog.findOne({ logId: id });
}

async function remove(id) {
  return AuditLog.findOneAndDelete({ logId: id });
}

module.exports = { create, findAll, findById, remove };
