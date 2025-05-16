const KhoanThu = require('../models/khoanthu.model');
async function create(data) { return KhoanThu.create(data); }
async function findAll(filter = {}) { return KhoanThu.find(filter); }
async function findById(id) { return KhoanThu.findOne({ idKhoanThu: id }); }
async function update(id, data) {
  return KhoanThu.findOneAndUpdate({ idKhoanThu: id }, data, { new: true });
}
async function remove(id) { return KhoanThu.findOneAndDelete({ idKhoanThu: id }); }
module.exports = { create, findAll, findById, update, remove };
