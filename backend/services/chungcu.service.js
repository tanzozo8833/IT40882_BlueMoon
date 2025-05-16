const repo = require('../repositories/chungcu.repo');

async function createChungCu(payload) {
  if (!payload.idChungCu || !payload.tenChungCu) {
    const err = new Error('idChungCu và tenChungCu là bắt buộc');
    err.status = 422;
    throw err;
  }
  return repo.create(payload);
}

async function getAllChungCu() { return repo.findAll(); }

async function getChungCuById(id) {
  const cc = await repo.findById(id);
  if (!cc) { const err = new Error('Chung cư không tồn tại'); err.status = 404; throw err; }
  return cc;
}

async function updateChungCu(id, payload) { return repo.update(id, payload); }
async function deleteChungCu(id) { return repo.remove(id); }

module.exports = {
  createChungCu,
  getAllChungCu,
  getChungCuById,
  updateChungCu,
  deleteChungCu
};
