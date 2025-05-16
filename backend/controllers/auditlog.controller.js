const service = require('../services/auditlog.service');

async function create(req, res, next) {
  try { res.status(201).json(await service.createLog(req.body)); }
  catch (e) { next(e); }
}

async function getAll(req, res, next) {
  try { res.json(await service.getAllLogs()); }
  catch (e) { next(e); }
}

async function getById(req, res, next) {
  try { res.json(await service.getLogById(req.params.id)); }
  catch (e) { next(e); }
}

async function remove(req, res, next) {
  try { await service.deleteLog(req.params.id); res.status(204).end(); }
  catch (e) { next(e); }
}

module.exports = { create, getAll, getById, remove };
