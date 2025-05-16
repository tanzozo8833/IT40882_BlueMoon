const repo = require('../repositories/canho.repo');

async function createCanHo(payload) {
  if (!payload.idCanHo || !payload.idChungCu) {
    const err = new Error('idCanHo và idChungCu là bắt buộc');
    err.status = 422;
    throw err;
  }
  return repo.create(payload);
}

async function getAllCanHo() { return repo.findAll(); }
async function getCanHoById(id) {
  const ch = await repo.findById(id);
  if (!ch) { const err = new Error('Căn hộ không tồn tại'); err.status = 404; throw err; }
  return ch;
}
async function updateCanHo(id, payload) { return repo.update(id, payload); }
async function deleteCanHo(id) { return repo.remove(id); }

module.exports = {
  createCanHo,
  getAllCanHo,
  getCanHoById,
  updateCanHo,
  deleteCanHo
};
