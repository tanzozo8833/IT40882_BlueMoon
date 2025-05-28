const TaikhoanUser = require("../models/TaiKhoan.js");
const { mongooseToObject, mutipleMongooseToObject } = require("../../utils/mongoose.js");
const NhanKhau = require("../models/NhanKhau.js");
const Phi = require("../models/Phi.js");
const SoHoKhau = require("../models/SoHoKhau.js");
const CanHo = require("../models/CanHo.js");
const TuThienPayment = require("../models/TuThienPayment.js");
const Quy = require("../models/QuyTuThien.js");
class UserController {
	// [GET] /user/:email
	async index(req, res) {
		const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
		res.render("user/home", {
			title: "home",
			TaiKhoanUser: mongooseToObject(user),
		});
	}
	async listNhanKhau(req, res, next) {
		try {
			const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
			if (!user) {
				return res.status(404).send("User not found");
			}

			const dsNhanKhau = await NhanKhau.find({ idSoHoKhau: user.idSoHoKhau }).lean();

			res.render("user/listNhanKhau.hbs", {
				layout: "userLayout",
				title: "Danh sách nhân khẩu",
				NhanKhau: mutipleMongooseToObject(dsNhanKhau),
				TaiKhoanUser: mongooseToObject(user),
			});
		} catch (err) {
			next(err);
		}
	}
	//get user/:id/chitiet
	chitiet(req, res, next) {
		NhanKhau.findOne({ _id: req.params.id })
			.then((NhanKhau) =>
				res.render("user/chitiet.hbs", {
					layout: "userLayout",
					NhanKhau: mongooseToObject(NhanKhau),
				})
			)
			.catch(next);
	}
	//get editform
	edit(req, res, next) {
		NhanKhau.findOne({ _id: req.params.id })
			.then((NhanKhau) =>
				res.render("user/editForm.hbs", {
					layout: "userLayout",
					NhanKhau: mongooseToObject(NhanKhau),
				})
			)
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
			await NhanKhau.findOneAndUpdate({ _id: req.params.id }, updates);
			res.redirect("/user/listNhanKhau");
		} catch (err) {
			next(err);
		}
	}
	async deleteNhanKhau(req, res, next) {
		try {
			await NhanKhau.findOneAndDelete({ _id: req.params.id });
			res.redirect("/user/listNhanKhau");
		} catch (err) {
			next(err);
		}
	}
	async phiDaDong(req, res, next) {
		const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
		const canho = await CanHo.findOne({ idSoHoKhau: user.idSoHoKhau }).lean();
		const phis = await Phi.find({ idCanHo: canho.idCanHo, trangThai: "da_dong" }).lean();
		res.render("user/listPhiDaDong.hbs", {
			layout: "userLayout",
			title: "Danh sách phí đã đóng",
			phi: mutipleMongooseToObject(phis),
		});
	}
	async phiChuaDong(req, res, next) {
		const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
		const canho = await CanHo.findOne({ idSoHoKhau: user.idSoHoKhau }).lean();
		const phis = await Phi.find({ idCanHo: canho.idCanHo, trangThai: "chua_dong" }).lean();
		res.render("user/listPhiChuaDong.hbs", {
			layout: "userLayout",
			title: "Danh sách phí chua đóng",
			phi: mutipleMongooseToObject(phis),
		});
	}
	async tuthien(req, res, next) {
		try {
			const user = await TaikhoanUser.findOne({ email: req.session.taiKhoan.email }).lean();
			const canho = await CanHo.findOne({ idSoHoKhau: user.idSoHoKhau }).lean();

			const tuthien = await TuThienPayment.find({ idCanHo: canho.idCanHo }).lean();

			// Lấy tất cả idQuyTuThien từ các khoản chưa đóng
			const idQuyList = tuthien.map((t) => t.idQuyTuThien);

			// Tìm tất cả quỹ có liên quan
			const quys = await Quy.find({ idQuyTuThien: { $in: idQuyList } }).lean();

			// Gộp thông tin tên quỹ vào từng khoản từ thiện
			const mergedList = tuthien.map((tien) => {
				const quy = quys.find((q) => q.idQuyTuThien === tien.idQuyTuThien);
				return {
					...tien,
					tenQuy: quy ? quy.tenQuy : "Không rõ",
					mota: quy ? quy.mota : "Không có mô tả",
				};
			});

			res.render("user/listTuThien", {
				layout: "userLayout",
				title: "Danh sách các khoản từ thiện chưa đóng",
				tuthien: mutipleMongooseToObject(mergedList),
			});
		} catch (err) {
			next(err);
		}
	}
	viewMyInfo(req, res) {
		if (!req.session.taiKhoan) return res.redirect("/login");

		TaikhoanUser.findById(req.session.taiKhoan._id)
			.then((taiKhoan) => {
				console.log("Thông tin tài khoản", taiKhoan);
				if (!taiKhoan) return res.status(404).send("Không tìm thấy tài khoản");
				res.render("user/userInfo", {
					taiKhoan: taiKhoan,
					title: "Thông tin cá nhân",
					layout: "userLayout",
				});
			})
			.catch((err) => {
				console.error("Lỗi khi lấy thông tin tài khoản:", err);
				res.status(500).send("Lỗi server");
			});
	}
	async postMyInfo(req, res) {
		try {
			// Lấy thông tin session
			const sessionUser = req.session.taiKhoan;
			const userId = sessionUser._id;

			// Lấy input
			const { oldPassword, newPassword, confirmPassword } = req.body;
			const errors = [];

			// 1. Validate đầu vào
			if (!oldPassword || !newPassword || !confirmPassword) {
				errors.push("Vui lòng nhập đầy đủ thông tin");
			}
			if (newPassword && newPassword.length < 3) {
				errors.push("Mật khẩu mới phải có ít nhất 3 ký tự");
			}
			if (newPassword && confirmPassword && newPassword !== confirmPassword) {
				errors.push("Xác nhận mật khẩu không khớp");
			}

			// Nếu có lỗi validate, vẫn cần lấy đầy đủ tài khoản để render
			if (errors.length) {
				const fullUser = await TaikhoanUser.findById(userId);
				return res.render("user/userInfo", {
					layout: "userLayout",
					taiKhoan: fullUser,
					errors,
					showChangePasswordModal: true,
				});
			}

			// 2. Kiểm tra mật khẩu cũ
			const user = await TaikhoanUser.findById(userId);
			if (!user) {
				errors.push("Không tìm thấy tài khoản");
			} else if (user.password !== oldPassword) {
				errors.push("Mật khẩu cũ không đúng");
			}

			if (errors.length) {
				console.log("Lỗi đầu vào:", errors);
				const fullUser = await TaikhoanUser.findById(userId);
				return res.render("user/userInfo", {
					layout: "userLayout",
					taiKhoan: fullUser,
					errors,
					showChangePasswordModal: true,
				});
			}

			// 3. Cập nhật mật khẩu
			user.password = newPassword;
			await user.save();

			// 4. Thành công
			req.flash("success_msg", "Đổi mật khẩu thành công");
			return res.redirect("/user/userInfo");
		} catch (err) {
			console.error("Lỗi khi cập nhật mật khẩu:", err);
			try {
				const fullUser = await TaikhoanUser.findById(req.session.taiKhoan._id);
				return res.status(500).render("user/userInfo", {
					layout: "userLayout",
					taiKhoan: fullUser,
					errors: ["Không thể cập nhật mật khẩu, vui lòng thử lại sau."],
					showChangePasswordModal: true,
				});
			} catch (loadError) {
				// fallback nếu việc lấy tài khoản cũng lỗi
				return res.status(500).render("user/userInfo", {
					layout: "userLayout",
					taiKhoan: {},
					errors: ["Lỗi hệ thống, vui lòng thử lại sau."],
					showChangePasswordModal: true,
				});
			}
		}
	}
}

module.exports = new UserController();
