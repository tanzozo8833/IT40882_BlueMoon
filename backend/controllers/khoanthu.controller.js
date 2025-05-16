const service = require('../services/khoanthu.service');

async function create(req, res, next) {
  try { res.status(201).json(await service.createKhoanThu(req.body)); }
  catch (e) { next(e); }
}
async function getAll(req, res, next) {
  try { res.json(await service.getAllKhoanThu()); }
  catch (e) { next(e); }
}
async function getById(req, res, next) {
  try { res.json(await service.getKhoanThuById(req.params.id)); }
  catch (e) { next(e); }
}
async function update(req, res, next) {
  try { res.json(await service.updateKhoanThu(req.params.id, req.body)); }
  catch (e) { next(e); }
}
async function remove(req, res, next) {
  try { await service.deleteKhoanThu(req.params.id); res.status(204).end(); }
  catch (e) { next(e); }
}

module.exports = { create, getAll, getById, update, remove };
