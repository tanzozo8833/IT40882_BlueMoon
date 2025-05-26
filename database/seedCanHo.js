const mongoose = require('mongoose');
const CanHo = require('../src/app/models/CanHo');
const SoHoKhau = require('../src/app/models/SoHoKhau');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

(async () => {
    try {
        const count = await CanHo.countDocuments();
        if (count > 0) {
            console.log(`⚠️  Đã có ${count} căn hộ. Bỏ qua seed.`);
            mongoose.connection.close();
            return;
        }

        // Lấy tối đa 3 sổ hộ khẩu có sẵn
        const soHoKhaus = await SoHoKhau.find().limit(15);

        if (soHoKhaus.length === 0) {
            console.log('⚠️  Không có sổ hộ khẩu nào để gán cho căn hộ.');
            mongoose.connection.close();
            return;
        }

        const canHoData = [
            {
                loai: 'nhà ở',
                idSoHoKhau: soHoKhaus[0].idSoHoKhau,
                soXeMay: 2,
                soOto: 1,
                dienTich: 75,
                trangThai: 'không trống',
            },
            {
                loai: 'penhouse',
                idSoHoKhau: soHoKhaus[1].idSoHoKhau,
                soXeMay: 4,
                soOto: 2,
                dienTich: 120,
                trangThai: 'không trống',
            },
            {
                loai: 'nhà ở',
                idSoHoKhau: soHoKhaus[2].idSoHoKhau,
                soXeMay: 1,
                soOto: 0,
                dienTich: 60,
                trangThai: 'không trống',
            },
            {
                loai: 'nhà ở',
                idSoHoKhau: soHoKhaus[3].idSoHoKhau,
                soXeMay: 2,
                soOto: 0,
                dienTich: 65,
                trangThai: 'không trống',
            },
            {
                loai: 'penhouse',
                idSoHoKhau: soHoKhaus[4].idSoHoKhau,
                soXeMay: 1,
                soOto: 1,
                dienTich: 160,
                trangThai: 'không trống',
            },
            {
                loai: 'nhà ở',
                idSoHoKhau: null,
                soXeMay: 0,
                soOto: 0,
                dienTich: 80,
                trangThai: 'trống',
            },
            {
                loai: 'penhouse',
                idSoHoKhau: null,
                soXeMay: 0,
                soOto: 0,
                dienTich: 185,
                trangThai: 'trống',
            },
            {
                loai: 'nhà ở',
                idSoHoKhau: null,
                soXeMay: 0,
                soOto: 0,
                dienTich: 55,
                trangThai: 'trống',
            },
            {
                loai: 'nhà ở',
                idSoHoKhau: null,
                soXeMay: 0,
                soOto: 0,
                dienTich: 70,
                trangThai: 'trống',
            },
            {
                loai: 'penhouse',
                idSoHoKhau: null,
                soXeMay: 0,
                soOto: 0,
                dienTich: 200,
                trangThai: 'trống',
            },
        ];

        for (const item of canHoData) {
            const canHo = new CanHo(item);
            await canHo.save(); // AutoIncrement sẽ tự động tạo idCanHo
        }

        console.log('✅ Seed căn hộ thành công!');
    } catch (err) {
        console.error('❌ Lỗi khi seed căn hộ:', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
