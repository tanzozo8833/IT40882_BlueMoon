const TaikhoanUser = require("../models/TaiKhoan.js");
const { mongooseToObject, mutipleMongooseToObject } = require("../../utils/mongoose.js");
const NhanKhau = require("../models/NhanKhau.js");
const CanHo = require("../models/CanHo.js");
const Phi = require("../models/Phi.js");
const TuThienPayment = require("../models/TuThienPayment.js");

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
        const soDanCu = await NhanKhau.countDocuments();
        const tongCanHo = await CanHo.countDocuments();
        const soCanHoTrong = await CanHo.countDocuments({ trangThai: 'trống' });
        // Tổng xe máy và ô tô bằng aggregation
        const vehicleStats = await CanHo.aggregate([
            {
                $group: {
                    _id: null,
                    tongXeMay: { $sum: "$soXeMay" },
                    tongOto: { $sum: "$soOto" }
                }
            }
        ]);

        const tongXeMay = vehicleStats[0]?.tongXeMay || 0;
        const tongOto = vehicleStats[0]?.tongOto || 0;

        const phiTheoThang = await Phi.aggregate([
            { $match: { trangThai: 'da_dong' } },
            {
                $group: {
                    _id: { thang: "$thang", nam: "$nam" },
                    tongTienPhi: { $sum: "$soTien" }
                }
            },
            { $sort: { "_id.nam": 1, "_id.thang": 1 } }
        ]);

        const tuThienTheoThang = await TuThienPayment.aggregate([
            {
                $group: {
                    _id: {
                        thang: { $month: "$thoiGianDongTien" },
                        nam: { $year: "$thoiGianDongTien" }
                    },
                    tongTienTuThien: { $sum: "$soTienDaDong" }
                }
            },
            { $sort: { "_id.nam": 1, "_id.thang": 1 } }
        ]);

        // Tạo mảng 12 tháng mặc định
        const currentYear = new Date().getFullYear();
        const months = Array.from({ length: 12 }, (_, i) => ({ thang: i + 1, nam: currentYear }));

        // Tạo map từ dữ liệu gốc
        const phiMap = new Map();
        phiTheoThang.forEach(p => {
            if (p._id.nam === currentYear) {
                phiMap.set(p._id.thang, p.tongTienPhi);
            }
        });

        const tuThienMap = new Map();
        tuThienTheoThang.forEach(t => {
            if (t._id.nam === currentYear) {
                tuThienMap.set(t._id.thang, t.tongTienTuThien);
            }
        });

        // Gộp lại thành mảng doanh thu 12 tháng
        const doanhThuTheoThang = months.map(m => ({
            thang: m.thang,
            tongTienPhi: phiMap.get(m.thang) || 0,
            tongTienTuThien: tuThienMap.get(m.thang) || 0
        }));
        const maxDoanhThu = Math.max(
            ...doanhThuTheoThang.map(d => Math.max(d.tongTienPhi, d.tongTienTuThien))
        );
        const doanhThuTheoThangNormalized = doanhThuTheoThang.map(d => ({
            ...d,
            heightPhi: maxDoanhThu ? Math.round((d.tongTienPhi / maxDoanhThu) * 100) : 0,
            heightTuThien: maxDoanhThu ? Math.round((d.tongTienTuThien / maxDoanhThu) * 100) : 0
        }));
        // Truy vấn 5 khoản phí đã đóng gần nhất (dựa trên updatedAt)
        const recentFees = await Phi.find({ trangThai: "da_dong" })
            .sort({ updatedAt: -1 })
            .limit(5)
        // Truy vấn 5 khoản từ thiện gần nhất (dựa trên thoiGianDongTien)
        const recentDonations = await TuThienPayment.find()
            .sort({ thoiGianDongTien: -1 })
            .limit(5)
        // Gộp lại và sắp xếp chung theo thời gian mới nhất
        const recentTransactions = [
            ...recentFees.map(f => ({
                type: 'fee',
                canHo: f.idCanHo,
                name: f.tenKhoanPhi,
                amount: f.soTien,
                date: f.updatedAt
            })),
            ...recentDonations.map(d => ({
                type: 'donation',
                canHo: d.idCanHo,
                name: 'từ thiện',
                amount: d.soTienDaDong,
                date: d.thoiGianDongTien
            }))
        ]
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // sắp theo thời gian mới nhất
        .slice(0, 7); // lấy tối đa 7 giao dịch gần nhất
        // Tính phần trăm tăng trưởng doanh thu tháng hiện tại
        const currentMonth = new Date().getMonth() + 1; // getMonth() trả về từ 0-11
        const currentMonthData = doanhThuTheoThang.find(d => d.thang === currentMonth);
        const lastMonthData = doanhThuTheoThang.find(d => d.thang === currentMonth - 1);

        let growthPercentage = null;
        if (currentMonthData && lastMonthData && lastMonthData.tongTienPhi + lastMonthData.tongTienTuThien > 0) {
            const currentTotal = currentMonthData.tongTienPhi + currentMonthData.tongTienTuThien;
            const lastTotal = lastMonthData.tongTienPhi + lastMonthData.tongTienTuThien;
            growthPercentage = ((currentTotal - lastTotal) / lastTotal) * 100;
            growthPercentage = Math.round(growthPercentage * 100) / 100; // Làm tròn 2 chữ số sau dấu phẩy
        } else {
            growthPercentage = 0; // Không đủ dữ liệu để tính hoặc tháng trước bằng 0
        }
        res.render("admin/home", {
            title: "home",
            layout: "adminLayout",
            soDanCu: soDanCu,
            tongCanHo: tongCanHo,
            soCanHoTrong: soCanHoTrong,
            tongXeMay: tongXeMay,
            tongOto: tongOto,
            doanhThuTheoThang: doanhThuTheoThangNormalized,
            recentTransactions: recentTransactions,
            growthPercentage: growthPercentage,
            currentMonth: currentMonth,
            currentYear: currentYear,
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