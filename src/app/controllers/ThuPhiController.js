const { mutipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose');
const Phi = require('../models/Phi');

class ThuPhiController {

    // GET /thuphi
    show(req, res, next) {
        Phi.find({})
            .then(danhSach => {
                danhSach = mutipleMongooseToObject(danhSach);
                res.render('admin/KeToan/ThuPhi/danhsach', {
                    layout: 'adminLayout',
                    title: 'Danh sách thu phí',
                    danhSach
                });
            })
            .catch(error => next(error));
    }
}

module.exports = new ThuPhiController();