
const { mutipleMongooseToObject } = require('../../utils/mongoose');
const Phi = require('../models/Phi');
const TuThienPayment = require('../models/TuThienPayment');
const CanHo = require('../models/CanHo');
const QuyTuThien = require('../models/QuyTuThien');
const SoHoKhau = require('../models/SoHoKhau');

class ThongKeController {
	listCanHo(req, res, next) {
		const now = new Date();
		const thang = parseInt(req.query.thang) || now.getMonth() + 1;
		const nam = parseInt(req.query.nam) || now.getFullYear();
        CanHo.find({}).lean()
            .then(canHoList => {
                const filteredCanHoList = canHoList.filter(canHo => !!canHo.idSoHoKhau);

                // Tạo danh sách idSoHoKhau để lấy dữ liệu SoHoKhau
                const listIdSoHoKhau = filteredCanHoList.map(c => c.idSoHoKhau);

                // Lấy dữ liệu sổ hộ khẩu liên quan
                return Promise.all([
                    filteredCanHoList,
                    SoHoKhau.find({ idSoHoKhau: { $in: listIdSoHoKhau } }).lean()
                ]);
            })
            .then(([canHoList, soHoKhauList]) => {
                // Tạo map để tra nhanh sổ hộ khẩu
                const soHoKhauMap = {};
                soHoKhauList.forEach(shk => {
                    soHoKhauMap[shk.idSoHoKhau] = shk.soSoHoKhau;
                });

                return Promise.all(
                    canHoList.map(canHo => {
                        return Promise.all([
                            Phi.find({ idCanHo: canHo.idCanHo, thang, nam }).lean(),
                            TuThienPayment.find({
                                idCanHo: canHo.idCanHo,
                                $expr: {
                                    $and: [
                                        { $eq: [{ $month: "$thoiGianDongTien" }, thang] },
                                        { $eq: [{ $year: "$thoiGianDongTien" }, nam] }
                                    ]
                                }
                            }).lean()
                        ]).then(([phiList, tuThienList]) => {
                            const totalPhi = phiList.reduce((sum, phi) => sum + phi.soTien, 0);
                            const daDongPhi = phiList
                                .filter(p => p.trangThai === 'da_dong')
                                .reduce((sum, p) => sum + p.soTien, 0);
                            const daTuThien = tuThienList.reduce((sum, p) => sum + p.soTienDaDong, 0);

                            return {
                                idCanHo: canHo.idCanHo,
                                soSoHoKhau: soHoKhauMap[canHo.idSoHoKhau] || '',
                                tongPhiThang: totalPhi,
                                daDongPhi,
                                daTuThien
                            };
                        });
                    })
                );
            })
            .then(results => {
                res.render('admin/KeToan/ThongKe/danhsach', {
                    layout: 'adminLayout',
                    title: 'Thống kê căn hộ',
                    thongKeList: results,
                    selectedThang: thang,
                    selectedNam: nam
                });
            })
            .catch(next);
    }


    async postFilter(req, res, next) {
        const { thang, nam } = req.body;
        res.redirect(`/admin/thongke?thang=${thang}&nam=${nam}`);
    }

    // GET /thongke/:idCanHo - Hiển thị chi tiết căn hộ
    async detailCanHo(req, res, next) {
        try {
            const idCanHo = req.params.idCanHo;
            const thang = parseInt(req.query.thang) || (new Date()).getMonth() + 1;
            const nam = parseInt(req.query.nam) || (new Date()).getFullYear();

			// Tìm thông tin căn hộ
			const canHo = await CanHo.findOne({ idCanHo }).lean();
			if (!canHo) {
				return res.status(404).send("Không tìm thấy căn hộ");
			}

			// Lấy danh sách phí của căn hộ trong tháng năm đó
			const danhSachPhi = await Phi.find({ idCanHo, thang, nam }).lean();

			const danhSachPhiCoDaDong = danhSachPhi.map((phi) => ({
				...phi,
				daDong: phi.trangThai === "da_dong",
			}));
			// Bạn có thể kết hợp hoặc xử lý thêm nếu cần


    // PUT /thongke/:idCanHo/:loaiPhi/:thang/:nam- Xử lý đóng tiền
    async dongtien(req, res, next) {
        try {
            const { loaiPhi, thang, nam, idCanHo } = req.params;

            // Tìm khoản phí cần cập nhật
            const phi = await Phi.findOne({
                loaiPhi,
                thang: Number(thang),
                nam: Number(nam),
                idCanHo
            });

            if (!phi) {
                return res.status(404).json({ success: false, message: 'Không tìm thấy phí cần đóng.' });
            }

            // Cập nhật trạng thái
            phi.trangThai = 'da_dong';
            await phi.save();

            res.json({
                success: true,
                message: `Đã đóng phí ${loaiPhi} cho căn hộ ${idCanHo} tháng ${thang}/${nam}.`
            });

        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đóng tiền:', error);
            next(error);
        }
    }


module.exports = new ThongKeController();
