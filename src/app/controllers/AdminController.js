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
    viewMyInfo(req, res) {
        if (!req.session.taiKhoan) return res.redirect("/login");

        TaikhoanUser.findById(req.session.taiKhoan._id)
            .then((taiKhoan) => {
                console.log("Thông tin tài khoản", taiKhoan);
                if (!taiKhoan) return res.status(404).send("Không tìm thấy tài khoản");
                res.render("admin/userInfo", {
                    taiKhoan: taiKhoan,
                    title: "Thông tin cá nhân",
                    layout: "adminLayout",
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
                return res.render("admin/userInfo", {
                    layout: "adminLayout",
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
                return res.render("admin/userInfo", {
                    layout: "adminLayout",
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
            return res.redirect("/admin/userInfo");
        } catch (err) {
            console.error("Lỗi khi cập nhật mật khẩu:", err);
            try {
                const fullUser = await TaikhoanUser.findById(req.session.taiKhoan._id);
                return res.status(500).render("admin/userInfo", {
                    layout: "adminLayout",
                    taiKhoan: fullUser,
                    errors: ["Không thể cập nhật mật khẩu, vui lòng thử lại sau."],
                    showChangePasswordModal: true,
                });
            } catch (loadError) {
                // fallback nếu việc lấy tài khoản cũng lỗi
                return res.status(500).render("admin/userInfo", {
                    layout: "adminLayout",
                    taiKhoan: {},
                    errors: ["Lỗi hệ thống, vui lòng thử lại sau."],
                    showChangePasswordModal: true,
                });
            }
        }
    }

}

module.exports = new AdminController();