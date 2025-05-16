const service = require('../services/canho.service');

async function create(req, res, next) {
  try { res.status(201).json(await service.createCanHo(req.body)); }
  catch (e) { next(e); }
}
async function getAll(req, res, next) {
  try { res.json(await service.getAllCanHo()); }
  catch (e) { next(e); }
}
async function getById(req, res, next) {
  try { res.json(await service.getCanHoById(req.params.id)); }
  catch (e) { next(e); }
}
async function update(req, res, next) {
  try { res.json(await service.updateCanHo(req.params.id, req.body)); }
  catch (e) { next(e); }
}
async function remove(req, res, next) {
  try { await service.deleteCanHo(req.params.id); res.status(204).end(); }
  catch (e) { next(e); }
}

module.exports = { create, getAll, getById, update, remove };
