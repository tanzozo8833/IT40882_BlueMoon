const TaikhoanUser = require('../models/TaiKhoan.js');
const { mongooseToObject, multipleMongooseToObject } = require('../../utils/mongoose.js');
const NhanKhau = require('../models/NhanKhau.js')
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

      const dsNhanKhau = await NhanKhau.find({ idSoHoKhau: user.idSoHoKhau });

      res.render('user/listNhanKhau.hbs', {
        layout: 'userLayout',
        title: 'Danh sách nhân khẩu',
        NhanKhau: multipleMongooseToObject(dsNhanKhau),
        TaiKhoanUser: mongooseToObject(user),
      });
    } catch (err) {
      next(err);
    }
  }
  //get user/:id/chitiet
  chitiet(req, res, next){
    NhanKhau.findById(req.params.id)
      .then(NhanKhau => res.render('user/chitiet.hbs', {
        NhanKhau: mongooseToObject(NhanKhau)
      }))
      .catch(next);
  }
  //get editform
  edit(req, res, next){
    NhanKhau.findById(req.params.id)
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
      await NhanKhau.findByIdAndUpdate(req.params.id, updates);
      res.redirect('/user/listNhanKhau');
    } catch (err) {
      next(err);
    }
  }
  async deleteNhanKhau(req, res, next) {
    try {
      await NhanKhau.findByIdAndDelete(req.params.id);
      res.redirect('/user/listNhanKhau');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();