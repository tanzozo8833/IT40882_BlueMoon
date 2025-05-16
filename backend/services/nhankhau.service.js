const repo = require('../repositories/nhankhau.repo');

async function createNhanKhau(payload) {
  if (!payload.idNhanKhau || !payload.hoTen) {
    const err = new Error('idNhanKhau và hoTen là bắt buộc');
    err.status = 422;
    throw err;
  }
  return repo.create(payload);
}

async function getAllNhanKhau() {
  return repo.findAll();
}

async function getNhanKhauById(id) {
  const nk = await repo.findById(id);
  if (!nk) {
    const err = new Error('Nhân khẩu không tồn tại');
    err.status = 404;
    throw err;
  }
  return nk;
}

async function updateNhanKhau(id, payload) {
  return repo.update(id, payload);
}

async function deleteNhanKhau(id) {
  return repo.remove(id);
}

module.exports = {
  createNhanKhau,
  getAllNhanKhau,
  getNhanKhauById,
  updateNhanKhau,
  deleteNhanKhau
};
