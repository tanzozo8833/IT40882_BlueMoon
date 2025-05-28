const TaikhoanUser = require("../models/TaiKhoan.js");
const { mongooseToObject, mutipleMongooseToObject } = require("../../utils/mongoose.js");

class AdminController {
    // [GET] /
    async index(req, res) {
		const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
		res.render("admin/index", {
			title: "home",
			TaiKhoanUser: mongooseToObject(user),
		});
	}

    // [GET] /admin/:email
    async index2(req, res) {
        res.render("admin/home", {
            title: "home",
            layout: "adminLayout",
        });
    }
}

module.exports = new AdminController();