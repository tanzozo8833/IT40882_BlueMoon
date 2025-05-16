const repo = require('../repositories/payment.repo');

async function createPayment(payload) {
  if (!payload.idPayment || !payload.idKhoanThu) {
    const err = new Error('idPayment và idKhoanThu là bắt buộc');
    err.status = 422;
    throw err;
  }
  return repo.create(payload);
}

async function getAllPayments() { return repo.findAll(); }
async function getPaymentById(id) {
  const p = await repo.findById(id);
  if (!p) { const err = new Error('Payment không tồn tại'); err.status = 404; throw err; }
  return p;
}
async function updatePayment(id, payload) { return repo.update(id, payload); }
async function deletePayment(id) { return repo.remove(id); }

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment
};
