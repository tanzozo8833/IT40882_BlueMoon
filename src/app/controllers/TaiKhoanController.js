const TaiKhoan = require('../models/TaiKhoan');

class TaiKhoanController {
    // Hiển thị danh sách tài khoản
    listTaiKhoan(req, res) {
        TaiKhoan.find({})
            .then(taikhoans => {
                res.render('admin/ToTruong/TaiKhoan/danhsach', {
                    taikhoans: taikhoans,
                    title: 'Danh sách tài khoản',
                    layout: 'adminLayout'
                });
            })
            .catch(err => {
                console.error('Lỗi khi lấy danh sách tài khoản:', err);
                res.status(500).send('Lỗi server');
            });
    }

    // Điều hướng đến trang thêm mới tài khoản
    addTaiKhoan(req, res) {
        res.render('admin/ToTruong/TaiKhoan/them', {
            title: 'Thêm tài khoản',
            layout: 'adminLayout'
        });
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
            .then(() => res.redirect('/admin/taikhoan'))
            .catch(err => {
                console.error('Lỗi khi tạo tài khoản:', err);
                res.status(400).send('Không thể tạo tài khoản. Có thể email hoặc tên đăng nhập đã tồn tại.');
            });
    }

    // Cập nhật thông tin tài khoản
    updateTaiKhoan(req, res) {
        const updates = req.body.updates;
        if (!Array.isArray(updates)) {
            return res.status(400).send('Dữ liệu không hợp lệ');
        }
        const updatePromises = updates.map(item => {
            return TaiKhoan.findOneAndUpdate(
            { idTaiKhoan: item.idTaiKhoan },
            { role: item.role },
            { new: true }
            );
        });
        Promise.all(updatePromises)
            .then(() => res.redirect('/admin/taikhoan'))
            .catch(err => {
            console.error('Lỗi khi cập nhật vai trò tài khoản:', err);
            res.status(500).send('Lỗi khi cập nhật vai trò tài khoản');
            });
    }

    // Xóa tài khoản
    deleteTaiKhoan(req, res) {
        const idTaiKhoan = req.params.id;

        TaiKhoan.findOneAndDelete({ idTaiKhoan: idTaiKhoan })
            .then(() => res.redirect('/admin/taikhoan'))
            .catch(err => {
                console.error('Lỗi khi xóa tài khoản:', err);
                res.status(500).send('Không thể xóa tài khoản');
            });
    }
}

module.exports = new TaiKhoanController();