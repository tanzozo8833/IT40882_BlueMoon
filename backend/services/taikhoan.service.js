const repo = require('../repositories/taikhoan.repo');
const bcrypt = require('bcryptjs');

async function createAccount({ idTaiKhoan, idSoHoKhau, email, password, role, fullName }) {
  // validate required
  if (!idTaiKhoan || !email || !password) {
    const err = new Error('idTaiKhoan, email và password là bắt buộc');
    err.status = 422;
    throw err;
  }
  // hash password
  const passwordHash = await bcrypt.hash(password, 10);
  return repo.create({ idTaiKhoan, idSoHoKhau, email, passwordHash, role, fullName });
}

async function getAllAccounts() {
  return repo.findAll();
}

async function getAccountById(id) {
  const acc = await repo.findById(id);
  if (!acc) {
    const err = new Error('Tài khoản không tồn tại');
    err.status = 404;
    throw err;
  }
  return acc;
}

async function updateAccount(id, payload) {
  if (payload.password) {
    payload.passwordHash = await bcrypt.hash(payload.password, 10);
    delete payload.password;
  }
  return repo.update(id, payload);
}

async function deleteAccount(id) {
  return repo.remove(id);
}

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount
};
