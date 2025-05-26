const mongoose = require('mongoose');
const QuyTuThien = require('../src/app/models/QuyTuThien');

mongoose.connect('mongodb://localhost:27017/BlueMoon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    // const count = await QuyTuThien.countDocuments();
    // if (count > 0) {
    //   console.log(`⚠️  Đã có ${count} quỹ từ thiện. Bỏ qua seed.`);
    //   return mongoose.connection.close();
    // }

    // Danh sách quỹ cần seed
    const quys = [
      {
        tenQuy: 'Quỹ Học Bổng Ươm Mầm Tài Năng',
        mota: 'Hỗ trợ học sinh, sinh viên nghèo vượt khó.',
        trangThai: "Kết thúc",
        ngayBatDau: new Date('2024-01-01'),
        ngayKetThuc: new Date('2024-06-30'),
      },
      {
        tenQuy: 'Quỹ Cứu Trợ Lũ Lụt Miền Trung',
        mota: 'Hỗ trợ đồng bào miền Trung bị ảnh hưởng lũ lụt.',
        trangThai: "Chua bat dau",
        ngayBatDau: new Date('2025-10-01'),
        ngayKetThuc: new Date('2025-12-31'),
      },
      {
        tenQuy: 'Quỹ Phát Triển Môi Trường Xanh',
        mota: 'Trồng cây, làm sạch sông ngòi và bảo tồn thiên nhiên.',
        trangThai: "Chua bat dau",
        ngayBatDau: new Date('2025-07-01'),
        ngayKetThuc: new Date('2025-12-31'),
      },
      {
        tenQuy: 'Quỹ Y Tế Cộng Đồng',
        mota: 'Cung cấp trang thiết bị y tế cho các trạm xá vùng sâu.',
        trangThai: "Đang hoạt động",
        ngayBatDau: new Date('2025-03-01'),
        ngayKetThuc: new Date('2025-09-30'),
      },
      {
        tenQuy: 'Quỹ Xây Trường Học Nông Thôn',
        mota: 'Xây mới và sửa chữa phòng học cho các trường vùng xa.',
        trangThai: "Đang hoạt động",
        ngayBatDau: new Date('2025-01-01'),
        ngayKetThuc: new Date('2025-06-01'),
      },
    ];

    // Đính kèm trạng thái mặc định sẽ tự tính trong model
    for (const item of quys) {
        const shk = new QuyTuThien(item);
        await shk.save(); // save sẽ trigger plugin AutoIncrement
    }    
    console.log(`✅ Seed quỹ từ thiện thành công: tạo ${quys.length} quỹ!`);
  } catch (err) {
    console.error('❌ Lỗi khi seed quỹ từ thiện:', err);
  } finally {
    mongoose.connection.close();
  }
})();