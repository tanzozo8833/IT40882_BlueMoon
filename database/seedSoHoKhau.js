const mongoose = require('mongoose');
const SoHoKhau = require('../src/app/models/SoHoKhau');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon');

(async () => {
    try {
        const count = await SoHoKhau.countDocuments();
        if (count > 0) {
            console.log(`⚠️  Đã có ${count} sổ hộ khẩu. Bỏ qua seed.`);
            mongoose.connection.close();
            return;
        }

        const danhSach = [
            { soSoHoKhau: 'HK001', hoTenChu: 'Nguyễn Văn K', thongTinThem: 'Tổ dân phố 3, phường X' },
            { soSoHoKhau: 'HK002', hoTenChu: 'Trần Thị P', thongTinThem: 'Tổ dân phố 5, phường Y' },
            { soSoHoKhau: 'HK003', hoTenChu: 'Phạm Văn L', thongTinThem: 'Khu tập thể Z' },
            { soSoHoKhau: 'HK004', hoTenChu: 'Nguyễn Văn N', thongTinThem: 'Vinhome, Ocean Park' },
            { soSoHoKhau: 'HK005', hoTenChu: 'Đặng Đình R', thongTinThem: 'Ba Na Hill, Duong len tien canh' }
        ];
        for (const item of danhSach) {
            const shk = new SoHoKhau(item);
            await shk.save(); // save sẽ trigger plugin AutoIncrement
        }

        console.log('✅ Seed sổ hộ khẩu thành công!');
    } catch (err) {
        console.error('❌ Lỗi khi seed sổ hộ khẩu:', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
