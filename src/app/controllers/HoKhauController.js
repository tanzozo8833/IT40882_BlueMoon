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

            res.render('admin/ToTruong/HoKhau/danhsach', { hokhaus: hokhausWithCanHo });
        })
        .catch(err => {
            console.error('Lỗi khi lấy danh sách hộ khẩu:', err);
            res.status(500).send('Lỗi server');
        });
    }

    // Điều hướng đến trang thêm mới hộ khẩu
    addHoKhau(req, res) {
        res.render('admin/ToTruong/HoKhau/them');
    }

    // Tạo mới hộ khẩu
    createHoKhau(req, res) {
        const { soSoHoKhau, hoTenChu, thongTinThem } = req.body;

        const newHoKhau = new SoHoKhau({ soSoHoKhau, hoTenChu, thongTinThem });

        newHoKhau.save()
            .then(() => res.redirect('/admin/hokhau'))
            .catch(err => {
                console.error('Lỗi khi tạo mới hộ khẩu:', err);
                res.status(400).send('Không thể tạo hộ khẩu. Có thể số sổ đã tồn tại.');
            });
    }

    // Xem chi tiết hộ khẩu
    getHoKhauById(req, res) {
        const idSoHoKhau = Number(req.params.id);

        SoHoKhau.findOne({ idSoHoKhau })
            .then(hokhau => {
                if (!hokhau) return res.status(404).send('Không tìm thấy hộ khẩu');
                res.render('admin/ToTruong/HoKhau/chitiet', { hokhau });
            })
            .catch(err => {
                console.error('Lỗi khi tìm hộ khẩu:', err);
                res.status(500).send('Lỗi server');
            });
    }

    // Cập nhật thông tin hộ khẩu
    updateHoKhau(req, res) {
        const idSoHoKhau = Number(req.params.id);
        const { soSoHoKhau, hoTenChu, thongTinThem } = req.body;

        SoHoKhau.findOneAndUpdate(
            { idSoHoKhau },
            { soSoHoKhau, hoTenChu, thongTinThem },
            { new: true }
        )
            .then(hokhau => {
                if (!hokhau) return res.status(404).send('Không tìm thấy hộ khẩu');
                res.redirect(`/admin/hokhau/${idSoHoKhau}`);
            })
            .catch(err => {
                console.error('Lỗi khi cập nhật hộ khẩu:', err);
                res.status(400).send('Không thể cập nhật hộ khẩu');
            });
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