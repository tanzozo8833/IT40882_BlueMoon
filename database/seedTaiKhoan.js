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
        const hoKhauList = await SoHoKhau.find().limit(2);

        if (hoKhauList.length === 0) {
            console.log('⚠️ Chưa có sổ hộ khẩu nào trong DB. Vui lòng seed SoHoKhau trước.');
            return mongoose.connection.close();
        }

        // Danh sách tài khoản cần tạo
        const taiKhoans = [
            {
                idSoHoKhau: hoKhauList[0].idSoHoKhau,
                email: 'admin@example.com',
                tenDangNhap: 'admin01',
                hoTen: 'Quản Trị Viên',
                password: 'admin123', // Trong thực tế nên hash mật khẩu
                role: 'admin'
            },
            {
                idSoHoKhau: hoKhauList[0].idSoHoKhau,
                email: 'user1@example.com',
                tenDangNhap: 'user01',
                hoTen: 'Nguyễn Văn User',
                password: 'user123',
                role: 'user'
            },
            {
                idSoHoKhau: hoKhauList[1].idSoHoKhau,
                email: 'user2@example.com',
                tenDangNhap: 'user02',
                hoTen: 'Trần Thị User',
                password: 'user456',
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
