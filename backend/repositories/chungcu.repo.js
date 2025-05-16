const ChungCu = require('../models/chungcu.model');

async function create(data) { return ChungCu.create(data); }
async function findAll(filter = {}) { return ChungCu.find(filter); }
async function findById(id) { return ChungCu.findOne({ idChungCu: id }); }
async function update(id, data) {
  return ChungCu.findOneAndUpdate({ idChungCu: id }, data, { new: true });
}
async function remove(id) { return ChungCu.findOneAndDelete({ idChungCu: id }); }

module.exports = { create, findAll, findById, update, remove };
