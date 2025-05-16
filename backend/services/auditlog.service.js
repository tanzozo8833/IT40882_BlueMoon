const repo = require('../repositories/auditlog.repo');

async function createLog({ logId, idTaiKhoan, changeType, description, targetCollection, targetId, ipAddress }) {
  if (!logId || !idTaiKhoan || !changeType) {
    const err = new Error('logId, idTaiKhoan và changeType là bắt buộc');
    err.status = 422;
    throw err;
  }
  return repo.create({ logId, idTaiKhoan, changeType, description, targetCollection, targetId, ipAddress });
}

async function getAllLogs() {
  return repo.findAll();
}

async function getLogById(id) {
  const log = await repo.findById(id);
  if (!log) {
    const err = new Error('Log không tồn tại');
    err.status = 404;
    throw err;
  }
  return log;
}

async function deleteLog(id) {
  return repo.remove(id);
}

module.exports = {
  createLog,
  getAllLogs,
  getLogById,
  deleteLog
};
