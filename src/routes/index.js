const loginRouter = require('./login');
const adminRouter = require('./admin');
const nhanvienRouter = require('./nhanvien');
const homeRouter = require('./home');

const authMiddleware = require('../app/middlewares/authMiddleware');

function route(app) {
    // Các route public không cần auth
    app.use('/login', loginRouter);
    app.use(authMiddleware.ensureAuthenticated);
    app.use('/admin', authMiddleware.requireRole(['admin']), adminRouter);
    app.use('/nhanvien', authMiddleware.requireRole(['nhanvien']), nhanvienRouter);
    app.use('/home', homeRouter);
}

module.exports = route;
