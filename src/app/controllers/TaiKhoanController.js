class TaiKhoanController {
    // Hiển thị danh sách tài khoản
    listTaiKhoan(req, res) {
        TaiKhoan.find()
            .then(taikhoans => {
                res.render('taikhoan/list', { taikhoans });
            })
            .catch(err => {
                console.error('Lỗi khi lấy danh sách tài khoản:', err);
                res.status(500).send('Lỗi server');
            });
    }

    // Điều hướng đến trang thêm mới tài khoản
    addTaiKhoan(req, res) {
        res.render('taikhoan/add');
    }

    // Tạo mới tài khoản
    createTaiKhoan(req, res) {
        const { email, tenDangNhap, hoTen, password, role, idSoHoKhau } = req.body;

        const newTaiKhoan = new TaiKhoan({
            email,
            tenDangNhap,
            hoTen,
            password,
            role,
            idSoHoKhau
        });

        newTaiKhoan.save()
            .then(() => res.redirect('/taikhoan'))
            .catch(err => {
                console.error('Lỗi khi tạo tài khoản:', err);
                res.status(400).send('Không thể tạo tài khoản. Có thể email hoặc tên đăng nhập đã tồn tại.');
            });
    }

    // Cập nhật thông tin tài khoản
    updateTaiKhoan(req, res) {
        const id = req.params.id;
        const { email, tenDangNhap, hoTen, password, role, idSoHoKhau } = req.body;

        TaiKhoan.findByIdAndUpdate(id, {
            email,
            tenDangNhap,
            hoTen,
            password,
            role,
            idSoHoKhau
        }, { new: true })
            .then(() => res.redirect('/taikhoan'))
            .catch(err => {
                console.error('Lỗi khi cập nhật tài khoản:', err);
                res.status(400).send('Không thể cập nhật tài khoản');
            });
    }

    // Xóa tài khoản
    deleteTaiKhoan(req, res) {
        const id = req.params.id;

        TaiKhoan.findByIdAndDelete(id)
            .then(() => res.redirect('/taikhoan'))
            .catch(err => {
                console.error('Lỗi khi xóa tài khoản:', err);
                res.status(500).send('Không thể xóa tài khoản');
            });
    }
}

module.exports = new TaiKhoanController();