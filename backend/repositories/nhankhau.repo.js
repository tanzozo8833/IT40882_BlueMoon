const NhanKhau = require('../models/nhankhau.model');

async function create(data) {
  return NhanKhau.create(data);
}

async function findAll(filter = {}) {
  return NhanKhau.find(filter);
}

async function findById(id) {
  return NhanKhau.findOne({ idNhanKhau: id });
}

async function update(id, data) {
  return NhanKhau.findOneAndUpdate({ idNhanKhau: id }, data, { new: true });
}

async function remove(id) {
  return NhanKhau.findOneAndDelete({ idNhanKhau: id });
}

module.exports = { create, findAll, findById, update, remove };
