const SoHoKhau = require('../models/SoHoKhau');
const CanHo = require('../models/CanHo');

class HoKhauController {
    // Hiển thị danh sách hộ khẩu
    listHoKhau(req, res) {
        const filter = {};

        if (req.query.hoTenChu) {
            filter.hoTenChu = new RegExp(req.query.hoTenChu, 'i');
        }

        if (req.query.idSoHoKhau) {
            filter.idSoHoKhau = Number(req.query.idSoHoKhau);
        }

        if (req.query.idCanHo) {
            const idCanHo = Number(req.query.idCanHo);

            CanHo.find({ idCanHo })
                .then((canhos) => {
                    const ids = canhos.map(ch => ch.idSoHoKhau).filter(Boolean); // tránh null
                    if (ids.length > 0) filter.idSoHoKhau = { $in: ids };

                    return SoHoKhau.find(filter);
                })
                .then(hokhaus => {
                    res.render('hokhau/list', { hokhaus });
                })
                .catch(err => {
                    console.error('Lỗi khi tìm hộ khẩu theo căn hộ:', err);
                    res.status(500).send('Lỗi server');
                });
        } else {
            // Không lọc theo idCanHo
            SoHoKhau.find(filter)
                .then(hokhaus => {
                    res.render('hokhau/list', { hokhaus });
                })
                .catch(err => {
                    console.error('Lỗi khi lấy danh sách hộ khẩu:', err);
                    res.status(500).send('Lỗi server');
                });
        }
    }

    // Điều hướng đến trang thêm mới hộ khẩu
    addHoKhau(req, res) {
        res.render('hokhau/add');
    }

    // Tạo mới hộ khẩu
    createHoKhau(req, res) {
        const { soSoHoKhau, hoTenChu, thongTinThem } = req.body;

        const newHoKhau = new SoHoKhau({ soSoHoKhau, hoTenChu, thongTinThem });

        newHoKhau.save()
            .then(() => res.redirect('/hokhau'))
            .catch(err => {
                console.error('Lỗi khi tạo mới hộ khẩu:', err);
                res.status(400).send('Không thể tạo hộ khẩu. Có thể số sổ đã tồn tại.');
            });
    }

    // Xem chi tiết hộ khẩu
    getHoKhauById(req, res) {
        const id = req.params.id;

        SoHoKhau.findById(id)
            .then(hokhau => {
                if (!hokhau) return res.status(404).send('Không tìm thấy hộ khẩu');
                res.render('hokhau/detail', { hokhau });
            })
            .catch(err => {
                console.error('Lỗi khi tìm hộ khẩu:', err);
                res.status(500).send('Lỗi server');
            });
    }

    // Cập nhật thông tin hộ khẩu
    updateHoKhau(req, res) {
        const id = req.params.id;
        const { soSoHoKhau, hoTenChu, thongTinThem } = req.body;

        SoHoKhau.findByIdAndUpdate(id, { soSoHoKhau, hoTenChu, thongTinThem }, { new: true })
            .then(() => res.redirect('/hokhau'))
            .catch(err => {
                console.error('Lỗi khi cập nhật hộ khẩu:', err);
                res.status(400).send('Không thể cập nhật hộ khẩu');
            });
    }

    // Xóa hộ khẩu
    deleteHoKhau(req, res) {
        const id = req.params.id;

        SoHoKhau.findByIdAndDelete(id)
            .then(() => res.redirect('/hokhau'))
            .catch(err => {
                console.error('Lỗi khi xóa hộ khẩu:', err);
                res.status(500).send('Không thể xóa hộ khẩu');
            });
    }
}

module.exports = new HoKhauController();