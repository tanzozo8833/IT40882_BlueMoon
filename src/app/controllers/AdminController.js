class AdminController {
    // [GET] /
    index(req, res, next) {
        res.render('admin/home', {
            title: 'home',
            layout: 'adminLayout',
        });
    }
}

module.exports = new AdminController();