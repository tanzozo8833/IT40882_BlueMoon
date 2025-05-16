const service = require('../services/chungcu.service');

async function create(req, res, next) {
  try { res.status(201).json(await service.createChungCu(req.body)); }
  catch (e) { next(e); }
}

async function getAll(req, res, next) {
  try { res.json(await service.getAllChungCu()); }
  catch (e) { next(e); }
}

async function getById(req, res, next) {
  try { res.json(await service.getChungCuById(req.params.id)); }
  catch (e) { next(e); }
}

async function update(req, res, next) {
  try { res.json(await service.updateChungCu(req.params.id, req.body)); }
  catch (e) { next(e); }
}

async function remove(req, res, next) {
  try { await service.deleteChungCu(req.params.id); res.status(204).end(); }
  catch (e) { next(e); }
}

module.exports = { create, getAll, getById, update, remove };
