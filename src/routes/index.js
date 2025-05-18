const homeRouter = require('./home');
const loginRouter = require('./login');

function route(app) {
    // Import the routers
    app.use('/login', loginRouter);
    app.use('/', homeRouter);
}

module.exports = route;