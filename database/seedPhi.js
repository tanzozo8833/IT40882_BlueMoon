// seed/phiSeed.js

const mongoose = require('mongoose');
const Phi = require('../src/app/models/Phi'); // Sửa đường dẫn tùy theo cấu trúc của bạn
const CanHo = require('../src/app/models/CanHo'); // Để lấy ID căn hộ

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon', {
})
    .then(() => {
        console.log('Kết nối MongoDB thành công!');
        return seedPhi();
    })
    .then(() => {
        console.log('Seed dữ liệu phí thành công!');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Lỗi:', err);
        mongoose.disconnect();
    });

// Hàm seed dữ liệu
async function seedPhi() {
    await Phi.deleteMany({}); // Xóa dữ liệu cũ (nếu muốn)

    const danhSachCanHo = await CanHo.find({ trangThai: "không trống" }); // Lấy danh sách căn hộ hiện có
    if (danhSachCanHo.length === 0) {
        throw new Error('Không tìm thấy căn hộ nào. Vui lòng seed căn hộ trước!');
    }

    const loaiPhiList = ['dien', 'nuoc', 'xemay', 'oto', 'Phi dich vu nha o', 'Phi dich vu cao cap', 'Phi quan ly'];
    const thang = 5;
    const nam = 2025;

    const seedData = [];

    // Lặp qua mỗi loại phí và căn hộ để tạo phí mẫu
    danhSachCanHo.forEach(canHo => {
        loaiPhiList.forEach(loaiPhi => {
            let soTien;
            if (loaiPhi === 'xemay') {
                soTien = 70000; // Phí cố định xe máy
            } else if (loaiPhi === 'oto') {
                soTien = 120000; // Phí cố định ô tô
            } else {
                soTien = Math.floor(Math.random() * 500000) + 50000; // Random từ 50k đến 500k cho các phí khác
            }

            const trangThai = Math.random() > 0.5 ? 'da_dong' : 'chua_dong';

            seedData.push({
                idCanHo: canHo.idCanHo,
                loaiPhi,
                soTien,
                trangThai,
                moTa: `Phí ${loaiPhi} tháng ${thang}/${nam}`,
                thang,
                nam
            });
        });
    });

    // Thêm vào DB
    await Phi.insertMany(seedData);
}
