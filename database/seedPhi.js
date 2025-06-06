// scripts/seedPhi.js
const mongoose = require('mongoose');
const Phi = require('../src/app/models/Phi');
const CanHo = require('../src/app/models/CanHo');

mongoose.connect('mongodb://localhost:27017/BlueMoon', {
});

(async () => {

  try {
    // const existing = await Phi.countDocuments();
    // if (existing > 0) {
    //   console.log(`⚠️ Đã có ${existing} bản ghi phí. Bỏ qua seed.`);
    //   return mongoose.connection.close();
    // }


        const now = new Date();
        const thang = now.getMonth() - 3;
        const nam = now.getFullYear();

        // Lấy các căn hộ không trống
        const canHos = await CanHo.find({ trangThai: 'không trống' }).exec();
        if (!canHos.length) {
            console.log('⚠️ Không có căn hộ nào không trống.');
            return mongoose.connection.close();
        }

        const feeTypes = [
            'dien',
            'nuoc',
            'xemay',
            'oto',
            'Phi dich vu nha o',
            'Phi dich vu cao cap',
            'Phi quan ly',
        ];

        // Hàm random integer trong khoảng [min, max]
        const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const docs = [];
        for (const ch of canHos) {
            for (const loaiPhi of feeTypes) {
                // Loại phí không áp dụng cho từng loại căn hộ
                if (ch.loai === 'penhouse' && loaiPhi === 'Phi dich vu nha o') continue;
                if (ch.loai === 'nhà ở' && loaiPhi === 'Phi dich vu cao cap') continue;

                // Tính số tiền
                let soTien;
                switch (loaiPhi) {
                    case 'xemay':
                        soTien = ch.soXeMay * 70000;
                        break;
                    case 'oto':
                        soTien = ch.soOto * 1200000;
                        break;
                    case 'dien':
                        soTien = randInt(300000, 800000);
                        break;
                    case 'nuoc':
                        soTien = randInt(100000, 300000);
                        break;
                    case 'Phi quan ly':
                        soTien = ch.dienTich * 7000;
                        break;
                    case 'Phi dich vu nha o':
                        soTien = ch.dienTich * 5000;
                        break;
                    case 'Phi dich vu cao cap':
                        soTien = ch.dienTich * 10000;
                        break;
                    default:
                        soTien = 0;
                }

                // Trạng thái ngẫu nhiên
                const trangThai = Math.random() < 0.5 ? 'chua_dong' : 'da_dong';

                docs.push({
                    idCanHo: ch.idCanHo,
                    loaiPhi,
                    soTien,
                    trangThai,
                    thang,
                    nam,
                    moTa: `Phí ${loaiPhi} căn hộ #${ch.idCanHo}`,
                });
            }
        }

        await Phi.insertMany(docs);
        console.log(`✅ Seed phí thành công: tạo ${docs.length} bản ghi.`);
    } catch (err) {
        console.error('❌ Lỗi khi seed phí:', err);
    } finally {
        mongoose.connection.close();
    }
})();