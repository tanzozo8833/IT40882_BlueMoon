const { mutipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose');
const Phi = require('../models/Phi');
const CanHo = require('../models/CanHo');
const { formatLoaiPhi } = require('../../utils/format');
function formatLoaiPhi1(loaiPhi) {
    const map = {
        dien: 'Điện',
        nuoc: 'Nước',
        'Phi quan ly': 'Phí quản lý chung cư',
        Phidichvu: 'Phí dịch vụ chung cư',
        Phuongtien: 'Phương tiện',
        xemay: 'Xe máy',
        oto: 'Ô tô',
        'Phi dich vu nha o': 'Phí dịch vụ nhà ở',
        'Phi dich vu cao cap': 'Phí dịch vụ cao cấp',
    };
    return map[loaiPhi] || loaiPhi;
}

class ThuPhiController {

    // GET /thuphi - Hiển thị danh sách loại phí (trang 1)
    show(req, res, next) {
        const { loaiPhi, thang, nam } = req.query;

        const match = {};
        if (loaiPhi) match.loaiPhi = loaiPhi;
        if (thang) match.thang = Number(thang);
        if (nam) match.nam = Number(nam);

        Phi.aggregate([
            { $match: match },
            {
                $group: {
                    _id: { loaiPhi: '$loaiPhi', thang: '$thang', nam: '$nam' },
                    tongSoTien: { $sum: '$soTien' },
                    tongSoTienDaThu: {
                        $sum: {
                            $cond: [{ $eq: ['$trangThai', 'da_dong'] }, '$soTien', 0]
                        }
                    },
                    soCanHo: { $addToSet: '$idCanHo' }
                }
            },
            {
                $project: {
                    loaiPhi: '$_id.loaiPhi',
                    thang: '$_id.thang',
                    nam: '$_id.nam',
                    tongSoTien: 1,
                    tongSoTienDaThu: 1,
                    soCanHo: { $size: '$soCanHo' }
                }
            },
            { $sort: { nam: -1, thang: -1, loaiPhi: 1 } }
        ])
            .then(danhSach => {
                res.render('admin/KeToan/ThuPhi/danhsach', {
                    layout: 'adminLayout',
                    title: 'Danh sách thu phí',
                    danhSach,
                    loaiPhi: formatLoaiPhi1(loaiPhi),
                    query: req.query
                });
            })
            .catch(error => next(error));
    }



    // GET /thuphi/:loaiPhi/:thang/:nam - Hiển thị chi tiết loại phí (trang 2)
    chiTiet(req, res, next) {
        const { loaiPhi, thang, nam } = req.params;

        Phi.find({ loaiPhi, thang: Number(thang), nam: Number(nam) })
            .then(async danhSachPhi => {
                const idCanHoList = danhSachPhi.map(p => p.idCanHo);
                const canHoDocs = await CanHo.find({ idCanHo: { $in: idCanHoList } });
                const canHoMap = Object.fromEntries(canHoDocs.map(ch => [ch.idCanHo, ch]));

                danhSachPhi = danhSachPhi.map(phi => ({
                    ...phi.toObject(),
                    canHo: canHoMap[phi.idCanHo] || null
                }));

                res.render('admin/KeToan/ThuPhi/chitiet', {
                    layout: 'adminLayout',
                    title: `Chi tiết phí ${loaiPhi} - Tháng ${thang}/${nam}`,
                    loaiPhi,
                    thang,
                    nam,
                    danhSachPhi
                });
            })
            .catch(error => next(error));
    }
    // PUT /thuphi/:loaiPhi/:thang/:nam/:idCanHo/dongtien - Xử lý đóng tiền
    async dongtien(req, res, next) {
        try {
            const { loaiPhi, thang, nam, idCanHo } = req.params;

            // Tìm khoản phí cần cập nhật
            const phi = await Phi.findOne({
                loaiPhi,
                thang: Number(thang),
                nam: Number(nam),
                idCanHo
            });

            if (!phi) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy phí cần đóng.' });
            }

            // Cập nhật trạng thái
            phi.trangThai = 'da_dong';
            await phi.save();

            res.json({
                success: true,
                message: `Đã đóng phí ${loaiPhi} cho căn hộ ${idCanHo} tháng ${thang}/${nam}.`
            });

        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đóng tiền:', error);
            next(error);
        }
    }

}

module.exports = new ThuPhiController();
