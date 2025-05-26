const { mutipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose');
const Phi = require('../models/Phi');
const CanHo = require('../models/CanHo');

class ThuPhiController {

    // GET /thuphi - Hiển thị danh sách loại phí (trang 1)
    show(req, res, next) {
        Phi.aggregate([
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
                    danhSach
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
}

module.exports = new ThuPhiController();
