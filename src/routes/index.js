const homeRouter = require('./home');

function route(app) {
    // Import the routers
    app.use('/', homeRouter);
}

module.exports = route;