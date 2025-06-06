const loginRouter = require('./login');
const adminRouter = require('./admin');
const userRouter = require('./user');
const logoutRouter = require('./logout');

const authMiddleware = require('../app/middlewares/authMiddleware');

function route(app) {
    app.use(authMiddleware);
    app.use('/login', loginRouter);

    app.use(authMiddleware.ensureAuthenticated);
    app.use('/admin', authMiddleware.requireRole(['admin']), adminRouter);
    app.use('/user', authMiddleware.requireRole(['user']), userRouter);
    app.use('/logout', logoutRouter);
}

module.exports = route;
