const mongoose = require('mongoose');
const CanHo = require('../src/app/models/CanHo');
const SoHoKhau = require('../src/app/models/SoHoKhau');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon');

(async () => {
    try {
        const count = await CanHo.countDocuments();
        if (count > 0) {
            console.log(`⚠️  Đã có ${count} căn hộ. Bỏ qua seed.`);
            mongoose.connection.close();
            return;
        }

        // Lấy các sổ hộ khẩu để gán vào căn hộ (chọn ra ngẫu nhiên vài cái)
        const soHoKhaus = await SoHoKhau.find().limit(3); // lấy tối đa 3 sổ

        if (soHoKhaus.length === 0) {
            console.log('⚠️  Không có sổ hộ khẩu nào để gán cho căn hộ.');
            mongoose.connection.close();
            return;
        }

        const canHoData = [
            {
                loai: 'nhà ở',
                idSoHoKhau: soHoKhaus[0]._id,
                soXeMay: 2,
                soOto: 1,
                dienTich: 75
            },
            {
                loai: 'penhouse',
                idSoHoKhau: soHoKhaus[1]._id,
                soXeMay: 4,
                soOto: 2,
                dienTich: 120
            },
            {
                loai: 'nhà ở',
                idSoHoKhau: soHoKhaus[2]._id,
                soXeMay: 1,
                soOto: 0,
                dienTich: 60
            }
        ];

        for (const item of canHoData) {
            const canHo = new CanHo(item);
            await canHo.save(); // AutoIncrement sẽ tự tăng idCanHo
        }

        console.log('✅ Seed căn hộ thành công!');
    } catch (err) {
        console.error('❌ Lỗi khi seed căn hộ:', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
