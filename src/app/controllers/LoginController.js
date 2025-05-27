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
                    res.redirect('/user/' + req.session.taiKhoan.email);
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Lỗi máy chủ');
            });
    }

    logOut(req, res) {
        // Xóa session
        req.session.destroy(err => {
            if (err) {
                console.error('❌ Lỗi khi đăng xuất:', err);
                return res.status(500).send('Không thể đăng xuất!');
            }

            // Xóa cookie nếu muốn (optional)
            res.clearCookie('connect.sid'); // Tên cookie mặc định khi dùng express-session

            // Chuyển hướng về trang đăng nhập
            res.redirect('/login');
        });
    }

    // [GET] /myInfo
    viewMyInfo(req, res) {
        if (!req.session.taiKhoan) return res.redirect('/login');

        TaiKhoan.findById(req.session.taiKhoan._id)
            .then(taiKhoan => {
                console.log("Thông tin tài khoản", taiKhoan);
                if (!taiKhoan) return res.status(404).send('Không tìm thấy tài khoản');
                res.render('myInfo', {
                    taiKhoan : taiKhoan,
                    title: 'Thông tin cá nhân',
                    layout: 'adminLayout',});
            })
            .catch(err => {
                console.error('Lỗi khi lấy thông tin tài khoản:', err);
                res.status(500).send('Lỗi server');
            });
    }

    postMyInfo(req, res) {
        const userId = req.session.taiKhoan._id;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // Kiểm tra đầu vào
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).send('Vui lòng nhập đầy đủ thông tin');
        }

        if (newPassword.length < 3) {
            return res.status(400).send('Mật khẩu mới phải có ít nhất 3 ký tự');
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).send('Xác nhận mật khẩu không khớp');
        }

        // Tìm người dùng theo ID và kiểm tra mật khẩu cũ
        TaiKhoan.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).send('Không tìm thấy tài khoản');
                }

                if (user.password !== oldPassword) {
                    return res.status(400).send('Mật khẩu cũ không đúng');
                }

                // Cập nhật mật khẩu mới
                user.password = newPassword;
                return user.save();
            })
            .then(() => {
                res.redirect('/myInfo');
            })
            .catch(err => {
                console.error('Lỗi khi cập nhật mật khẩu:', err);
                res.status(500).send('Không thể cập nhật mật khẩu');
            });
    }
}

module.exports = new LoginController();
