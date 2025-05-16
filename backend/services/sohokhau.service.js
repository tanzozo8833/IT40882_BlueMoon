const repo = require('../repositories/sohokhau.repo');

async function createSoHoKhau(payload) {
  if (!payload.idSoHoKhau || !payload.soSoHoKhau) {
    const err = new Error('idSoHoKhau và soSoHoKhau là bắt buộc');
    err.status = 422;
    throw err;
  }
  return repo.create(payload);
}

async function getAllSoHoKhau() {
  return repo.findAll();
}

async function getSoHoKhauById(id) {
  const sh = await repo.findById(id);
  if (!sh) {
    const err = new Error('Sổ hộ khẩu không tồn tại');
    err.status = 404;
    throw err;
  }
  return sh;
}

async function updateSoHoKhau(id, payload) {
  return repo.update(id, payload);
}

async function deleteSoHoKhau(id) {
  return repo.remove(id);
}

module.exports = {
  createSoHoKhau,
  getAllSoHoKhau,
  getSoHoKhauById,
  updateSoHoKhau,
  deleteSoHoKhau
};
