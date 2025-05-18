const TaiKhoan = require('../models/TaiKhoan');

class LoginController {
    // [GET] /login
    viewlogin(req, res) {
        res.render('login', {
            title: 'Login',
            layout: 'main',
        });
    }

    // [POST] /login (dùng then/catch)
    postLogin(req, res) {
        const { email, password } = req.body;
        TaiKhoan.findOne({ email })
            .then(taiKhoan => {
                if (!taiKhoan) {
                    console.log('Không tìm thấy tài khoản');
                    return res.render('login', {
                        title: 'Login',
                        layout: 'main',
                        error: 'Tài khoản không tồn tại!',
                    });
                }

                // So sánh mật khẩu
                if (password !== taiKhoan.password) {
                    return res.render('login', {
                        title: 'Login',
                        layout: 'main',
                        error: 'Mật khẩu không đúng!',
                    });
                }

                // Lưu thông tin người dùng vào session
                req.session.taiKhoan = {
                    _id: taiKhoan._id,
                    email: taiKhoan.email,
                    role: taiKhoan.role,
                };

                // Điều hướng sau khi đăng nhập thành công
                if (taiKhoan.role === 'admin') {
                    res.redirect('/admin');
                } else if (taiKhoan.role === 'user') {
                    res.redirect('/user');
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Lỗi máy chủ');
            });
    }
}

module.exports = new LoginController();
