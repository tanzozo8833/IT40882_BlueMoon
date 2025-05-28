const QuyTuThien = require('../models/QuyTuThien');
const TuThienPayment = require('../models/TuThienPayment');
const CanHo = require('../models/CanHo');
const { mutipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose');

class TuThienController {
    show(req, res, next) {
        const { idQuy, startDate, endDate } = req.query;

        // Tạo điều kiện lọc
        const filter = {};
        if (idQuy) {
            filter.idQuyTuThien = idQuy;
        }

        if (startDate || endDate) {
            filter.ngayBatDau = {};
            if (startDate) {
                filter.ngayBatDau.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.ngayBatDau.$lte = new Date(endDate);
            }
        }

        QuyTuThien.find(filter)
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
                    danhSachTuThien,
                    idQuy,
                    startDate,
                    endDate
                });
            })
            .catch(next);
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
        const idslug = req.params.idslug;
        const id = idslug.split('-')[0];
        const idCanHoQuery = req.query.idCanHo ? Number(req.query.idCanHo) : null;

        QuyTuThien.findOne({ idQuyTuThien: id })
            .then(quy => {
                if (!quy) {
                    return res.status(404).send('Quỹ từ thiện không tồn tại');
                }

                const trangThai = quy.tinhTrangThai();

                TuThienPayment.aggregate([
                    { $match: { idQuyTuThien: quy.idQuyTuThien } },
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

                        // Tìm đóng góp, có thể lọc theo idCanHo nếu có
                        const paymentFilter = { idQuyTuThien: quy.idQuyTuThien };
                        if (idCanHoQuery) paymentFilter.idCanHo = idCanHoQuery;

                        TuThienPayment.find(paymentFilter)
                            .then(async dongGopList => {
                                const idCanHoList = dongGopList.map(d => d.idCanHo);
                                const canHoDocs = await CanHo.find({ idCanHo: { $in: idCanHoList } });
                                const canHoMap = Object.fromEntries(canHoDocs.map(ch => [ch.idCanHo, ch]));

                                dongGopList = dongGopList.map(dg => ({
                                    ...dg.toObject(),
                                    canHo: canHoMap[dg.idCanHo] || null
                                }));

                                res.render('admin/KeToan/TuThien/chitiet', {
                                    layout: 'adminLayout',
                                    title: 'Chi tiết quỹ từ thiện',
                                    quy: mongooseToObject(quy),
                                    trangThai,
                                    dongGopList,
                                    tongSoTien,
                                    soLuongCanHo,
                                    idCanHo: idCanHoQuery || '' // Truyền ngược về view để hiển thị giá trị nhập
                                });
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
    }


    // [GET] /admin/tuthien/:idQuyTuThienslug/ungho
    formungho(req, res, next) {
        const idslug = req.params.idslug;
        // Tách id từ idSlug
        const id = idslug.split('-')[0];
        QuyTuThien.findOne({ idQuyTuThien: Number(id) })
            .then(quy => {
                res.render('admin/KeToan/TuThien/ungho', {
                    layout: 'adminLayout',
                    title: 'Ung hộ quỹ từ thiện',
                    quy: mongooseToObject(quy)
                });
            })
            .catch(next);
    }

    // [POST] /admin/tuthien/:idslug/ungho
    // [POST] /admin/tuthien/:idslug/ungho
    ungho(req, res, next) {
        const idslug = req.params.idslug;
        const id = Number(idslug.split('-')[0]);

        if (isNaN(id)) {
            return res.status(400).send('ID Quỹ phải là số');
        }

        const idCanHo = Number(req.body.idCanHo);
        if (isNaN(idCanHo)) {
            return res.status(400).send('ID Căn hộ phải là số');
        }

        const soTienDaDong = Number(req.body.soTienDaDong);
        if (isNaN(soTienDaDong) || soTienDaDong <= 0) {
            return res.status(400).send('Số tiền ủng hộ không hợp lệ');
        }

        QuyTuThien.findOne({ idQuyTuThien: id })
            .then(quy => {
                if (!quy) throw new Error('Không tìm thấy Quỹ từ thiện');

                return CanHo.findOne({ idCanHo: idCanHo }).then(canHo => {
                    if (!canHo) throw new Error('Không tìm thấy căn hộ');

                    // ✅ Kiểm tra xem hộ đã đóng góp cho quỹ này chưa
                    return TuThienPayment.findOne({ idCanHo, idQuyTuThien: id }).then(existing => {
                        if (existing) {
                            // Nếu đã tồn tại, trả về lỗi hoặc thông báo
                            return res.status(400).send('Căn hộ này đã ủng hộ quỹ từ thiện này rồi!');
                        }

                        const payment = new TuThienPayment({
                            idCanHo,
                            soTienDaDong,
                            idQuyTuThien: id
                        });

                        return payment.save();
                    });
                });
            })
            .then(() => res.redirect(`/admin/tuthien/${idslug}`))
            .catch(err => {
                console.error("Lỗi khi lưu ủng hộ:", err);
                next(err);
            });
    }

    // [GET] /admin/tuthien/:idslug/chinh-sua
    edit(req, res, next) {
        const idslug = req.params.idslug;
        const id = idslug.split('-')[0];

        QuyTuThien.findOne({ idQuyTuThien: Number(id) })
            .then(quy => {
                if (!quy) {
                    return res.status(404).send('Không tìm thấy quỹ từ thiện để chỉnh sửa');
                }

                res.render('admin/KeToan/TuThien/chinhsua', {
                    layout: 'adminLayout',
                    title: 'Chỉnh sửa quỹ từ thiện',
                    quy: mongooseToObject(quy)
                });
            })
            .catch(next);
    }

    // [POST] /admin/tuthien/:idslug/chinh-sua
    update(req, res, next) {
        const idslug = req.params.idslug;
        const id = idslug.split('-')[0];

        // Lấy dữ liệu từ form gửi lên (req.body)
        const updateData = {
            tenQuy: req.body.tenQuy,
            mota: req.body.mota,
            ngayBatDau: req.body.ngayBatDau,
            ngayKetThuc: req.body.ngayKetThuc,
            // Thêm các trường khác bạn muốn chỉnh sửa
        };

        QuyTuThien.findOneAndUpdate({ idQuyTuThien: Number(id) }, updateData, { new: true })
            .then(quy => {
                if (!quy) {
                    return res.status(404).send('Không tìm thấy quỹ từ thiện để cập nhật');
                }
                res.redirect(`/admin/tuthien`);
            })
            .catch(next);
    }


}

module.exports = new TuThienController();
