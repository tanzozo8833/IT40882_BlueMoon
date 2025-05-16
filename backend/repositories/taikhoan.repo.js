const TaiKhoan = require('../models/taikhoan.model');

async function create(data) {
  return TaiKhoan.create(data);
}

async function findAll(filter = {}) {
  return TaiKhoan.find(filter);
}

async function findById(id) {
  return TaiKhoan.findOne({ idTaiKhoan: id });
}

async function update(id, data) {
  return TaiKhoan.findOneAndUpdate({ idTaiKhoan: id }, data, { new: true });
}

async function remove(id) {
  return TaiKhoan.findOneAndDelete({ idTaiKhoan: id });
}

module.exports = { create, findAll, findById, update, remove };
