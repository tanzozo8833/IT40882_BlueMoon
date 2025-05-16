const Payment = require('../models/payment.model');
async function create(data) { return Payment.create(data); }
async function findAll(filter = {}) { return Payment.find(filter); }
async function findById(id) { return Payment.findOne({ idPayment: id }); }
async function update(id, data) {
  return Payment.findOneAndUpdate({ idPayment: id }, data, { new: true });
}
async function remove(id) { return Payment.findOneAndDelete({ idPayment: id }); }
module.exports = { create, findAll, findById, update, remove };
