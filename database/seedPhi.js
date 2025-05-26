// scripts/seedPhi.js
const mongoose = require('mongoose');
const Phi     = require('../src/app/models/Phi');
const CanHo   = require('../src/app/models/CanHo');

mongoose.connect('mongodb://localhost:27017/BlueMoon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    const existing = await Phi.countDocuments();
    if (existing > 0) {
      console.log(`⚠️ Đã có ${existing} bản ghi phí. Bỏ qua seed.`);
      return mongoose.connection.close();
    }

    // Lấy tất cả căn hộ không trống
    const canHos = await CanHo.find({ trangThai: 'không trống' }).exec();
    if (!canHos.length) {
      console.log('⚠️ Không có căn hộ "không trống". Seed phí dừng.');
      return mongoose.connection.close();
    }

    // Tất cả loại phí gốc
    const allFeeTypes = [
      'dien',
      'nuoc',
      'xemay',
      'oto',
      'Phi dich vu nha o',
      'Phi dich vu cao cap',
      'Phi quan ly',
    ];

    // Hàm random boolean
    const randBool = () => Math.random() < 0.5;

    // Khoảng tiền cho từng loại phí (bạn có thể điều chỉnh)
    const feeRanges = {
      dien:            [300000, 800000],
      nuoc:            [100000, 300000],
      xemay:           [50000, 150000],
      oto:             [100000, 300000],
      'Phi dich vu nha o':  [200000, 500000],
      'Phi dich vu cao cap': [400000, 800000],
      'Phi quan ly':   [100000, 250000],
    };

    const now = new Date();
    const thang = now.getMonth() + 1;
    const nam   = now.getFullYear();

    const docs = [];

    for (const ch of canHos) {
      // Chọn fee types phù hợp với loại căn hộ
      let feeTypes = [...allFeeTypes];
      if (ch.loai === 'penhouse') {
        feeTypes = feeTypes.filter(f => f !== 'Phi dich vu nha o');
      } else { // nhà ở
        feeTypes = feeTypes.filter(f => f !== 'Phi dich vu cao cap');
      }

      // Tạo từng bản ghi phí
      for (const loaiPhi of feeTypes) {
        const [min, max] = feeRanges[loaiPhi];
        const soTien = Math.floor(Math.random() * (max - min + 1)) + min;
        const trangThai = randBool() ? 'da_dong' : 'chua_dong';

        docs.push({
          idCanHo: ch.idCanHo,
          loaiPhi,
          soTien,
          trangThai,
          thang,
          nam,
          moTa: `${loaiPhi} – căn hộ #${ch.idCanHo}`,
        });
      }
    }

    await Phi.insertMany(docs);
    console.log(`✅ Seed phí thành công: đã tạo ${docs.length} bản ghi.`);
  } catch (err) {
    console.error('❌ Lỗi seed phí:', err);
  } finally {
    mongoose.connection.close();
  }
})();
