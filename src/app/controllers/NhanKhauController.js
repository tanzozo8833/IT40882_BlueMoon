class NhanKhauController {
    quyengop(req, res) {
        // Xử lý logic ở đây
        res.send('Trang quyên góp của nhân khẩu');
        // hoặc: res.render('nhankhau/quyengop'); nếu bạn dùng view
    }
}

module.exports = new NhanKhauController();
