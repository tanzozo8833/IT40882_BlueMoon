const NhanKhau = require('../models/NhanKhau');
const SoHoKhau = require('../models/SoHoKhau');

class NhanKhauController {
    // Hiển thị danh sách nhân khẩu
    listNhanKhau(req, res) {
        const filter = {};
        
        if (req.query.hoTen) filter.hoTen = new RegExp(req.query.hoTen, 'i');
        if (req.query.soHoKhau) filter.idSoHoKhau = Number(req.query.soHoKhau);

        NhanKhau.find(filter)
            .populate('idSoHoKhau')
            .then((nhanKhaus) => {
                res.render('nhankhau/list', { nhanKhaus });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Lỗi truy vấn danh sách nhân khẩu');
            });
    }

    // Điều hướng đến trang thêm mới nhân khẩu
    addNhanKhau(req, res) {
        res.render('nhankhau/add');
    }

    // Tạo mới nhân khẩu
    createNhanKhau(req, res) {
        const nhanKhau = new NhanKhau(req.body);
        nhanKhau.save()
            .then(() => {
                res.redirect('/nhankhau');
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Lỗi tạo nhân khẩu');
            });
    }

    // Xem chi tiết nhân khẩu
    getNhanKhauById(req, res) {
        const id = req.params.id;

        NhanKhau.findById(id)
            .populate('idSoHoKhau')
            .then((nhanKhau) => {
                if (!nhanKhau) return res.status(404).send('Không tìm thấy nhân khẩu');
                res.render('nhankhau/detail', { nhanKhau });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Lỗi truy vấn nhân khẩu');
            });
    }

    // Cập nhật thông tin nhân khẩu
    updateNhanKhau(req, res) {
        const id = req.params.id;
        NhanKhau.findByIdAndUpdate(id, req.body, { new: true })
            .then((updated) => {
                if (!updated) return res.status(404).send('Không tìm thấy nhân khẩu');
                res.redirect('/nhankhau');
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Lỗi cập nhật nhân khẩu');
            });
    }

    // Xóa nhân khẩu
    deleteNhanKhau(req, res) {
        const id = req.params.id;
        NhanKhau.findByIdAndDelete(id)
            .then((deleted) => {
                if (!deleted) return res.status(404).send('Không tìm thấy nhân khẩu');
                res.redirect('/nhankhau');
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Lỗi xóa nhân khẩu');
            });
    }
}

module.exports = new NhanKhauController();
