const SoHoKhau = require('../models/SoHoKhau');
const CanHo = require('../models/CanHo');

class HoKhauController {
    // Hiển thị danh sách hộ khẩu
    listHoKhau(req, res) {
    SoHoKhau.find()
        .then(async (hokhaus) => {
            // Với mỗi hộ khẩu, tìm căn hộ có idSoHoKhau trỏ đến nó
            const hokhausWithCanHo = await Promise.all(hokhaus.map(async (hokhau) => {
                const canHo = await CanHo.findOne({ idSoHoKhau: hokhau.idSoHoKhau });
                return {
                    ...hokhau.toObject(), // convert từ mongoose document về plain object
                    idCanHo: canHo ? canHo.idCanHo : null
                };
            }));

            res.render('admin/ToTruong/HoKhau/danhsach', {
                hokhaus: hokhausWithCanHo,
                title: 'Danh sách hộ khẩu',
                layout: 'adminLayout'
            });
        })
        .catch(err => {
            console.error('Lỗi khi lấy danh sách hộ khẩu:', err);
            res.status(500).send('Lỗi server');
        });
    }

    // Điều hướng đến trang thêm mới hộ khẩu
    addHoKhau(req, res) {
        res.render('admin/ToTruong/HoKhau/them', {
            title: 'Thêm hộ khẩu',
            layout: 'adminLayout'
        });
    }

    // Tạo mới hộ khẩu
    createHoKhau(req, res) {
        const { soSoHoKhau, hoTenChu, thongTinThem } = req.body;

        SoHoKhau.findOne({ soSoHoKhau: soSoHoKhau.trim() })
            .then(existing => {
                if (existing) {
                    req.flash('error_msg', 'Số sổ hộ khẩu đã tồn tại trong hệ thống.');
                    return res.redirect('/admin/hokhau/add'); // Trang thêm mới
                }

                const newHoKhau = new SoHoKhau({ soSoHoKhau, hoTenChu, thongTinThem });

                return newHoKhau.save()
                    .then(() => {
                        req.flash('success_msg', 'Thêm sổ hộ khẩu thành công.');
                        return res.redirect('/admin/hokhau'); // Trang danh sách
                    });
            })
            .catch(err => {
                console.error('Lỗi khi tạo mới hộ khẩu:', err);
                req.flash('error_msg', 'Đã xảy ra lỗi khi thêm sổ hộ khẩu.');
                return res.redirect('/admin/hokhau/add');
            });
    }

    // Xem chi tiết hộ khẩu
    getHoKhauById(req, res) {
        const idSoHoKhau = Number(req.params.id);

        SoHoKhau.findOne({ idSoHoKhau })
            .then(hokhau => {
                if (!hokhau) return res.status(404).send('Không tìm thấy hộ khẩu');
                res.render('admin/ToTruong/HoKhau/chitiet', {
                    hokhau,
                    title: 'Chi tiết hộ khẩu',
                    layout: 'adminLayout'
                });
            })
            .catch(err => {
                console.error('Lỗi khi tìm hộ khẩu:', err);
                res.status(500).send('Lỗi server');
            });
    }

    // Cập nhật thông tin hộ khẩu
    async updateHoKhau(req, res) {
        try {
            const idSoHoKhau = Number(req.params.id);
            const { soSoHoKhau, hoTenChu, thongTinThem } = req.body;

            // Tìm hộ khẩu cần cập nhật
            const currentHoKhau = await SoHoKhau.findOne({ idSoHoKhau });
            if (!currentHoKhau) {
                req.flash('error_msg', 'Không tìm thấy sổ hộ khẩu.');
                return res.redirect('/admin/hokhau');
            }

            // Nếu số sổ mới khác với hiện tại → kiểm tra trùng
            if (currentHoKhau.soSoHoKhau !== soSoHoKhau) {
                const existing = await SoHoKhau.findOne({ soSoHoKhau });
                if (existing) {
                    req.flash('error_msg', 'Số sổ hộ khẩu đã tồn tại.');
                    return res.redirect(`/admin/hokhau/${idSoHoKhau}`);
                }
            }

            // Cập nhật
            await SoHoKhau.findOneAndUpdate(
                { idSoHoKhau },
                { soSoHoKhau, hoTenChu, thongTinThem },
                { new: true }
            );

            req.flash('success_msg', 'Cập nhật sổ hộ khẩu thành công.');
            res.redirect(`/admin/hokhau/${idSoHoKhau}`);
        } catch (err) {
            console.error('Lỗi khi cập nhật sổ hộ khẩu:', err);
            req.flash('error_msg', 'Đã xảy ra lỗi khi cập nhật sổ hộ khẩu.');
            res.redirect(`/admin/hokhau/${req.params.id}`);
        }
    }


    // Xóa hộ khẩu
    deleteHoKhau(req, res) {
        const idSoHoKhau = Number(req.params.id);

        SoHoKhau.findOneAndDelete({ idSoHoKhau })
            .then(hokhau => {
                if (!hokhau) return res.status(404).send('Không tìm thấy hộ khẩu để xóa');
                res.redirect('/admin/hokhau');
            })
            .catch(err => {
                console.error('Lỗi khi xóa hộ khẩu:', err);
                res.status(500).send('Không thể xóa hộ khẩu');
            });
    }
}

module.exports = new HoKhauController();