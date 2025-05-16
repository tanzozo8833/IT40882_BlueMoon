const authService = require('../services/auth.service');

async function register(req, res, next) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ message: 'Đăng ký thành công', user: result });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    res.json({ message: 'Đăng nhập thành công', ...result });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
