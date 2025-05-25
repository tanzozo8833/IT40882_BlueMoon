const mongoose = require('mongoose');
const TaiKhoan = require('../src/app/models/TaiKhoan'); // Đảm bảo đường dẫn đúng

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

(async () => {
    try {
        const existing = await TaiKhoan.findOne({ tenDangNhap: 'admin' });
        if (existing) {
            console.log('⚠️  Tài khoản admin đã tồn tại.');
            mongoose.connection.close();
            return;
        }

        const newAdmin = new TaiKhoan({
            idSoHoKhau: null,
            email: 'admin@test.com',
            tenDangNhap: 'admin',
            hoTen: 'Quản trị viên',
            password: '123456', // Mật khẩu plain text
            role: 'admin',
        });

        await newAdmin.save();
        console.log('✅ Tạo tài khoản admin thành công!');
    } catch (err) {
        console.error('❌ Lỗi khi tạo tài khoản admin:', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
