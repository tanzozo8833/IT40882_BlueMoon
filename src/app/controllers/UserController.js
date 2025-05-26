const TaikhoanUser = require('../models/TaiKhoan.js');
const { mongooseToObject, mutipleMongooseToObject } = require('../../utils/mongoose.js');
const NhanKhau = require('../models/NhanKhau.js');
const Phi = require('../models/Phi.js');
const SoHoKhau = require('../models/SoHoKhau.js');
const CanHo = require('../models/CanHo.js');
const TuThienPayment = require('../models/TuThienPayment.js');
const Quy = require('../models/QuyTuThien.js');
class UserController {
    // [GET] /user/:email
    index(req, res) {
        res.render('user/home', {
            title: 'home',
            layout: 'userLayout',
        });
    }
    async listNhanKhau(req, res, next) {
    try {
      const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
      if (!user) {
        return res.status(404).send('User not found');
      }

      const dsNhanKhau = await NhanKhau.find({ idSoHoKhau: user.idSoHoKhau }).lean();

      res.render('user/listNhanKhau.hbs', {
        layout: 'userLayout',
        title: 'Danh sách nhân khẩu',
        NhanKhau: mutipleMongooseToObject(dsNhanKhau),
        TaiKhoanUser: mongooseToObject(user),
      });
    } catch (err) {
      next(err);
    }
  }
  //get user/:id/chitiet
  chitiet(req, res, next){
    NhanKhau.findOne({_id: req.params.id})
      .then(NhanKhau => res.render('user/chitiet.hbs', {
        NhanKhau: mongooseToObject(NhanKhau)
      }))
      .catch(next);
  }
  //get editform
  edit(req, res, next){
    NhanKhau.findOne({_id: req.params.id})
      .then(NhanKhau => res.render('user/editForm.hbs', {
        NhanKhau: mongooseToObject(NhanKhau)
      }))
      .catch(next);
  }
  async updateNhanKhau(req, res, next) {
    try {
      const updates = {
        quanHeVoiChuHo: req.body.quanHeVoiChuHo,
        trangThai: req.body.trangThai,
        hoTen: req.body.hoTen,
        noiSinh: req.body.noiSinh,
        queQuan: req.body.queQuan,
        ngaySinh: req.body.ngaySinh,
        danToc: req.body.danToc,
        ngheNghiep: req.body.ngheNghiep,
        noiLamViec: req.body.noiLamViec,
        thongTinKhac: req.body.thongTinKhac,
        soCCCD: req.body.soCCCD,
        ngayCap: req.body.ngayCap,
        noiCap: req.body.noiCap,
      };
      await NhanKhau.findOneAndUpdate({_id: req.params.id}, updates);
      res.redirect('/user/listNhanKhau');
    } catch (err) {
      next(err);
    }
  }
  async deleteNhanKhau(req, res, next) {
    try {
      await NhanKhau.findOneAndDelete({_id: req.params.id});
      res.redirect('/user/listNhanKhau');
    } catch (err) {
      next(err);
    }
  }
  async phiDaDong(req, res, next){
    const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
    const canho = await CanHo.findOne({ idSoHoKhau: user.idSoHoKhau }).lean();
    const phis = await Phi.find({idCanHo: canho.idCanHo, trangThai: 'da_dong'}).lean();
    res.render('user/listPhiDaDong.hbs', {
        title: 'Danh sách phí đã đóng',
        phi: mutipleMongooseToObject(phis),
    });
  }
  async phiChuaDong(req, res, next){
    const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
    const canho = await CanHo.findOne({ idSoHoKhau: user.idSoHoKhau }).lean();
    const phis = await Phi.find({idCanHo: canho.idCanHo, trangThai: 'chua_dong'}).lean();
    res.render('user/listPhiChuaDong.hbs', {
        title: 'Danh sách phí chua đóng',
        phi: mutipleMongooseToObject(phis),
    });
  }
  async tuthien(req, res, next) {
  try {
    const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
    const canho = await CanHo.findOne({ idSoHoKhau: user.idSoHoKhau }).lean();

    const tuthien = await TuThienPayment.find({ idCanHo: canho.idCanHo}).lean();

    // Lấy tất cả idQuyTuThien từ các khoản chưa đóng
    const idQuyList = tuthien.map(t => t.idQuyTuThien);

    // Tìm tất cả quỹ có liên quan
    const quys = await Quy.find({ idQuyTuThien: { $in: idQuyList } }).lean();

    // Gộp thông tin tên quỹ vào từng khoản từ thiện
    const mergedList = tuthien.map(tien => {
      const quy = quys.find(q => q.idQuyTuThien === tien.idQuyTuThien);
      return {
        ...tien,
        tenQuy: quy ? quy.tenQuy : 'Không rõ'
      };
    });

    res.render('user/listTuThien', {
      title: 'Danh sách các khoản từ thiện chưa đóng',
      tuthien: mutipleMongooseToObject(mergedList)
    });
  } catch (err) {
    next(err);
  }
}
}

module.exports = new UserController();