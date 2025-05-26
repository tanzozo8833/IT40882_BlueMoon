class AdminController {
    // [GET] /
    index(req, res) {
        res.render('admin/home', {
            title: 'home',
            layout: 'adminLayout',
        });
    }

}

module.exports = new AdminController();