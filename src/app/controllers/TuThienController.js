const QuyTuThien = require('../models/QuyTuThien');
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

    them(req, res, next) {
        res.render('admin/KeToan/TuThien/them', {
            layout: 'adminLayout',
            title: 'Thêm quỹ từ thiện'
        });
    }
}

module.exports = new TuThienController();
