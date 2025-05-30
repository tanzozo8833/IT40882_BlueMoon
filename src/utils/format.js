const Handlebars = require("handlebars");

//Hàm map loại phí
const loaiPhiMap = {
	dien: "Điện",
	nuoc: "Nước",
	"Phi quan ly": "Phí quản lý chung cư",
	Phidichvu: "Phí dịch vụ chung cư",
	Phuongtien: "Phương tiện",
	xemay: "Xe máy",
	oto: "Ô tô",
	"Phi dich vu nha o": "Phí dịch vụ nhà ở",
	"Phi dich vu cao cap": "Phí dịch vụ cao cấp",
};

// Đăng ký helper
Handlebars.registerHelper("formatLoaiPhi", function (loaiPhi) {
	return loaiPhiMap[loaiPhi] || loaiPhi;
});

// hbs.registerHelper("ifEquals", (a, b, opts) => (a == b ? opts.fn(this) : opts.inverse(this)));
Handlebars.registerHelper("ifEquals", function (a, b, options) {
	if (a == b) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});
module.exports = Handlebars;
