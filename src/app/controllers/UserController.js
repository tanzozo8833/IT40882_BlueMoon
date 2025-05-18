class UserController {
    // [GET] /
    index(req, res) {
        res.render('user/home', {
            title: 'home',
            layout: 'userLayout',
        });
    }
}

module.exports = new UserController();