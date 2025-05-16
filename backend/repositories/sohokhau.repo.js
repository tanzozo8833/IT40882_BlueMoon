const SoHoKhau = require('../models/sohokhau.model');

async function create(data) {
  return SoHoKhau.create(data);
}
async function findAll(filter = {}) {
  return SoHoKhau.find(filter);
}
async function findById(id) {
  return SoHoKhau.findOne({ idSoHoKhau: id });
}
async function update(id, data) {
  return SoHoKhau.findOneAndUpdate({ idSoHoKhau: id }, data, { new: true });
}
async function remove(id) {
  return SoHoKhau.findOneAndDelete({ idSoHoKhau: id });
}

module.exports = { create, findAll, findById, update, remove };
