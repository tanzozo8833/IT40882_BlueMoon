const TaiKhoan = require('../models/TaiKhoan');
const SoHoKhau = require('../models/SoHoKhau');

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
    async createTaiKhoan(req, res) {
        const { email, tenDangNhap, hoTen, password, role, soSoHoKhau } = req.body;

        try {
            // Tìm idSoHoKhau từ số sổ hộ khẩu
            const soHoKhau = await SoHoKhau.findOne({ soSoHoKhau });
            if (!soHoKhau) {
                req.flash('error_msg', 'Không tìm thấy sổ hộ khẩu với số đã nhập.');
                return res.redirect('/admin/taikhoan/add');
            }

            // Kiểm tra email hoặc tên đăng nhập đã tồn tại
            const existing = await TaiKhoan.findOne({
                $or: [{ email }, { tenDangNhap }]
            });

            if (existing) {
                req.flash('error_msg', 'Email hoặc tên đăng nhập đã tồn tại.');
                return res.redirect('/admin/taikhoan/add');
            }

            // Tạo tài khoản
            const newTaiKhoan = new TaiKhoan({
                email,
                tenDangNhap,
                hoTen,
                password,
                role,
                idSoHoKhau: soHoKhau.idSoHoKhau
            });

            await newTaiKhoan.save();
            req.flash('success_msg', 'Tạo tài khoản thành công.');
            res.redirect('/admin/taikhoan');
        } catch (err) {
            console.error('Lỗi khi tạo tài khoản:', err);
            req.flash('error_msg', 'Đã xảy ra lỗi khi tạo tài khoản.');
            res.redirect('/admin/taikhoan/add');
        }
    }


    // Cập nhật thông tin tài khoản
    updateTaiKhoan(req, res) {
        let updates;
        try {
        updates = JSON.parse(req.body.updatedRoles);
        } catch (e) {
        return res.status(400).send('Dữ liệu không hợp lệ');
        }

        if (!Array.isArray(updates)) {
            return res.status(400).send('Dữ liệu không hợp lệ');
        }
        const updatePromises = updates.map(item => {
            return TaiKhoan.findOneAndUpdate(
            { idTaiKhoan: item.id },
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