const CanHo = require('../models/canho.model');
async function create(data) { return CanHo.create(data); }
async function findAll(filter = {}) { return CanHo.find(filter); }
async function findById(id) { return CanHo.findOne({ idCanHo: id }); }
async function update(id, data) { return CanHo.findOneAndUpdate({ idCanHo: id }, data, { new: true }); }
async function remove(id) { return CanHo.findOneAndDelete({ idCanHo: id }); }
module.exports = { create, findAll, findById, update, remove };
