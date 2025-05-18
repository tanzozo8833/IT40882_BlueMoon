class LoginController {
    // [GET] /login
    viewlogin(req, res) {
        res.render('login', {
            title: 'Login',
            layout: 'main',
        });
    }

    // [POST] /login
    postLogin(req, res) {
        const { username, password } = req.body;
        console.log(username, password); // kiểm tra dữ liệu
        res.redirect('/'); // hoặc render trang nào đó
    }
}

module.exports = new LoginController();