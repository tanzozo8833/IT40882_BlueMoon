class AdminController {
    // [GET] /
    index(req, res) {
        res.render('admin/home', {
            title: 'home',
            layout: 'adminLayout',
        });
    }

    // [GET] /thuphi
    thuphi(req, res) {
        res.render('admin/KeToan/thuphi', {
            title: 'Thu Phí',
            layout: 'adminLayout',
        });
    }

}

module.exports = new AdminController();