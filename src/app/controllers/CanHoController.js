const CanHo = require('../models/CanHo');
const SoHoKhau = require('../models/SoHoKhau');

class CanHoController {
    // Hiển thị danh sách căn hộ
    listCanHo(req, res) {
        CanHo.find().populate('idSoHoKhau')
            .then(canhoList => {
                res.render('canho/list', { canhoList });
            })
            .catch(err => {
                console.error('Lỗi khi lấy danh sách căn hộ:', err);
                res.status(500).send('Lỗi server');
            });
    }

    //Điều hướng đến trang thêm mới căn hộ
    addCanHo(req, res) {
        // Lấy danh sách sổ hộ khẩu để chọn khi tạo căn hộ
        SoHoKhau.find()
            .then(hoKhauList => {
                res.render('canho/add', { hoKhauList });
            })
            .catch(err => {
                console.error('Lỗi khi lấy danh sách sổ hộ khẩu:', err);
                res.status(500).send('Lỗi server');
            });
    }

    // Tạo mới căn hộ
    createCanHo(req, res) {
        const { loai, idSoHoKhau, soXeMay, soOto, dienTich } = req.body;

        const newCanHo = new CanHo({
            loai,
            idSoHoKhau,
            soXeMay,
            soOto,
            dienTich
        });

        newCanHo.save()
            .then(() => res.redirect('/canho'))
            .catch(err => {
                console.error('Lỗi khi tạo căn hộ:', err);
                res.status(400).send('Không thể tạo căn hộ');
            });
    }

    // Xem chi tiết căn hộ
    getCanHoById(req, res) {
        const id = req.params.id;

        CanHo.findOne({ idCanHo: id }).populate('idSoHoKhau')
            .then(canho => {
                if (!canho) return res.status(404).send('Không tìm thấy căn hộ');
                res.render('canho/detail', { canho });
            })
            .catch(err => {
                console.error('Lỗi khi lấy chi tiết căn hộ:', err);
                res.status(500).send('Lỗi server');
            });
    }

    // Cập nhật thông tin căn hộ
    updateCanHo(req, res) {
        const id = req.params.id;
        const { loai, idSoHoKhau, soXeMay, soOto, dienTich } = req.body;

        CanHo.findOneAndUpdate(
            { idCanHo: id },
            { loai, idSoHoKhau, soXeMay, soOto, dienTich },
            { new: true }
        )
            .then(() => res.redirect(`/canho/${id}`))
            .catch(err => {
                console.error('Lỗi khi cập nhật căn hộ:', err);
                res.status(400).send('Không thể cập nhật căn hộ');
            });
    }

    // Xóa căn hộ
    deleteCanHo(req, res) {
        const id = req.params.id;

        CanHo.findOneAndDelete({ idCanHo: id })
            .then(() => res.redirect('/canho'))
            .catch(err => {
                console.error('Lỗi khi xóa căn hộ:', err);
                res.status(500).send('Không thể xóa căn hộ');
            });
    }
}

module.exports = new CanHoController();

