const repo = require('../repositories/khoanthu.repo');

async function createKhoanThu(payload) {
  if (!payload.idKhoanThu || !payload.type) {
    const err = new Error('idKhoanThu và type là bắt buộc');
    err.status = 422;
    throw err;
  }
  return repo.create(payload);
}

async function getAllKhoanThu() { return repo.findAll(); }
async function getKhoanThuById(id) {
  const kt = await repo.findById(id);
  if (!kt) { const err = new Error('Khoản thu không tồn tại'); err.status = 404; throw err; }
  return kt;
}
async function updateKhoanThu(id, payload) { return repo.update(id, payload); }
async function deleteKhoanThu(id) { return repo.remove(id); }

module.exports = {
  createKhoanThu,
  getAllKhoanThu,
  getKhoanThuById,
  updateKhoanThu,
  deleteKhoanThu
};
