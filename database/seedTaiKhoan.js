const mongoose = require('mongoose');
const TaiKhoan = require('../src/app/models/TaiKhoan');
const SoHoKhau = require('../src/app/models/SoHoKhau');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

(async () => {
    try {
        // Tìm một số sổ hộ khẩu để liên kết với tài khoản
        const hoKhauList = await SoHoKhau.find().limit(5);

        if (hoKhauList.length === 0) {
            console.log('⚠️ Chưa có sổ hộ khẩu nào trong DB. Vui lòng seed SoHoKhau trước.');
            return mongoose.connection.close();
        }

        // Danh sách tài khoản cần tạo
        const taiKhoans = [
            {
                idSoHoKhau: hoKhauList[0].idSoHoKhau,
                email: 'user1@example.com',
                tenDangNhap: 'user01',
                hoTen: 'Nguyễn Văn K',
                password: 'user123456',
                role: 'user'
            },
            {
                idSoHoKhau: hoKhauList[1].idSoHoKhau,
                email: 'user2@example.com',
                tenDangNhap: 'user02',
                hoTen: 'Trần Thị P',
                password: 'user123456',
                role: 'user'
            },
            {
                idSoHoKhau: hoKhauList[2].idSoHoKhau,
                email: 'user3@example.com',
                tenDangNhap: 'user03',
                hoTen: 'Phạm Văn L',
                password: 'user123456',
                role: 'user'
            },
            {
                idSoHoKhau: hoKhauList[3].idSoHoKhau,
                email: 'user4@example.com',
                tenDangNhap: 'user04',
                hoTen: 'Nguyễn Văn N',
                password: 'user123456',
                role: 'user'
            },
            {
                idSoHoKhau: hoKhauList[4].idSoHoKhau,
                email: 'user5@example.com',
                tenDangNhap: 'user05',
                hoTen: 'Đặng Đình R',
                password: 'user123456',
                role: 'user'
            }
        ];

        for (const tk of taiKhoans) {
            try {
                const taiKhoan = new TaiKhoan(tk);
                await taiKhoan.save();
                console.log(`✅ Đã tạo tài khoản: ${tk.tenDangNhap}`);
            } catch (err) {
                console.error(`❌ Lỗi khi tạo ${tk.tenDangNhap}:`, err.message);
            }
        }

    } catch (err) {
        console.error('❌ Lỗi khi seed tài khoản:', err);
    } finally {
        mongoose.connection.close();
    }
})();
