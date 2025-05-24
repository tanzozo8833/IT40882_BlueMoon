const QuyTuThien = require('../models/QuyTuThien');
const TuThienPayment = require('../models/TuThienPayment');
const { mutipleMongooseToObject } = require('../../utils/mongoose');

class TuThienController {
    show(req, res, next) {
        QuyTuThien.find({})
            .then(danhSach => {
                danhSach = mutipleMongooseToObject(danhSach);

                const now = new Date();
                const danhSachTuThien = danhSach.map((item) => {
                    let trangThai;
                    if (item.ngayBatDau && now < item.ngayBatDau) trangThai = 'Chưa bắt đầu';
                    else if (item.ngayKetThuc && now > item.ngayKetThuc) trangThai = 'Kết thúc';
                    else trangThai = 'Đang hoạt động';

                    return {
                        ...item,
                        trangThai
                    };
                });

                res.render('admin/KeToan/TuThien/danhsach', {
                    layout: 'adminLayout',
                    title: 'Danh sách từ thiện',
                    danhSachTuThien
                });
            })
            .catch(error => next(error));
    }

    // [GET] /admin/tuthien/them
    create(req, res, next) {
        res.render('admin/KeToan/TuThien/them', {
            layout: 'adminLayout',
            title: 'Thêm quỹ từ thiện'
        });
    }
    // [POST] /admin/tuthien/them
    store(req, res, next) {
        const quyTuThien = new QuyTuThien(req.body);

        quyTuThien.save()
            .then(() => res.redirect('/admin/tuthien'))
            .catch(next);
    }

    // [GET] /admin/tuthien/:idslug
    detail(req, res, next) {
        const idslug = req.params.idslug; // ví dụ: '642a39b1d8e5f65a5c123abc-qua-tu-thien-ung-ho-tre-em'

        // Tách id từ idSlug
        const id = idslug.split('-')[0];

        QuyTuThien.findById(id)
            .then(quy => {

                const trangThai = quy.tinhTrangThai();

                TuThienPayment.aggregate([
                    { $match: { idQuyTuThien: quy._id } },
                    {
                        $group: {
                            _id: null,
                            tongSoTien: { $sum: "$soTienDaDong" },
                            soLuongCanHo: { $addToSet: "$idCanHo" }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            tongSoTien: 1,
                            soLuongCanHo: { $size: "$soLuongCanHo" }
                        }
                    }
                ])
                    .then(result => {
                        const tongSoTien = result[0]?.tongSoTien || 0;
                        const soLuongCanHo = result[0]?.soLuongCanHo || 0;

                        TuThienPayment.find({ idQuyTuThien: quy._id })
                            .populate('idCanHo')
                            .then(dongGopList => {
                                res.render('admin/KeToan/TuThien/chitiet', {
                                    layout: 'adminLayout',
                                    title: 'Chi tiết quỹ từ thiện',
                                    quy,
                                    trangThai,
                                    dongGopList,
                                    tongSoTien,
                                    soLuongCanHo
                                });
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    }
    // [GET] /admin/tuthien/:idslug/dongtientuthien
    dongtientuthien(req, res, next) {
        const idslug = req.params.idslug; // ví dụ: '642a39b1d8e5f65a5c123abc-qua-tu-thien-ung-ho-tre-em'

        // Tách id từ idSlug
        const id = idslug.split('-')[0];

        QuyTuThien.findById(id)
            .then(quy => {
                if (!quy) {
                    return res.status(404).send('Quỹ từ thiện không tồn tại');
                }

                res.render('admin/KeToan/TuThien/dongtientuthien', {
                    layout: 'adminLayout',
                    title: 'Đóng góp quỹ từ thiện',
                    quy
                });
            })
            .catch(next);
    }


}

module.exports = new TuThienController();
