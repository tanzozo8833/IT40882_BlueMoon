const CanHo = require('../models/CanHo');
const SoHoKhau = require('../models/SoHoKhau');

class CanHoController {
    // Hiển thị danh sách căn hộ
    listCanHo(req, res) {
        CanHo.find()
            .then(canhos => {
                res.render('admin/ToTruong/CanHo/danhsach', { canhos: canhos, title: 'Danh sách căn hộ', layout: 'adminLayout' });
            })
            .catch(err => {
                console.error('Lỗi khi lấy danh sách căn hộ:', err);
                res.status(500).send('Lỗi server');
            });
    }

    // Xem chi tiết căn hộ
    getCanHoById(req, res) {
        const id = req.params.id;

        CanHo.findOne({ idCanHo: id }).populate('idSoHoKhau')
            .then(canho => {
                if (!canho) return res.status(404).json({ error: 'Không tìm thấy căn hộ' });
                res.json(canho); // ← trả về JSON thay vì render
            })
            .catch(err => {
                console.error('Lỗi khi lấy chi tiết căn hộ:', err);
                res.status(500).json({ error: 'Lỗi server' });
            });
    }

    // Cập nhật thông tin căn hộ từ overlay (dùng fetch)
    // updateCanHo(req, res) {
    //     const id = req.params.id;
    //     const { loai, idSoHoKhau, soXeMay, soOto, dienTich, trangThai } = req.body;

    //     CanHo.findOneAndUpdate(
    //         { idCanHo: id },
    //         { loai, idSoHoKhau, soXeMay, soOto, dienTich, trangThai },
    //         { new: true }
    //     )
    //         .then(updated => {
    //             if (!updated) return res.status(404).json({ error: 'Không tìm thấy căn hộ' });
    //             res.json({ message: 'Cập nhật thành công', canHo: updated });
    //         })
    //         .catch(err => {
    //             console.error('Lỗi khi cập nhật căn hộ:', err);
    //             res.status(400).json({ error: 'Không thể cập nhật căn hộ' });
    //         });
    // }

    updateCanHo = async (req, res) => {
        try {
            const idCanHo = req.params.id; // Lấy id từ URL
            const { trangThai } = req.body; // Lấy trạng thái mới từ form

            // Kiểm tra giá trị trạng thái có hợp lệ không
            if (!['trống', 'không trống'].includes(trangThai)) {
                return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
            }

            // Tìm căn hộ theo id và cập nhật trạng thái
            const canHo = await CanHo.findOneAndUpdate(
                { idCanHo: idCanHo },
                { trangThai: trangThai },
                { new: true } // Trả về document đã cập nhật
            );

            if (!canHo) {
                return res.status(404).json({ message: 'Không tìm thấy căn hộ.' });
            }

            // Trả về dữ liệu mới sau khi cập nhật (hoặc redirect nếu dùng HTML form)
            res.redirect('/admin/canho'); // Redirect về danh sách căn hộ
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái.' });
        }
    };
}

module.exports = new CanHoController();

