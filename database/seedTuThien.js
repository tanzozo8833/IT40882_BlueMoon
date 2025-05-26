const mongoose = require('mongoose');
const TuThienPayment = require('../src/app/models/TuThienPayment');
const QuyTuThien      = require('../src/app/models/QuyTuThien');
const CanHo           = require('../src/app/models/CanHo');

mongoose.connect('mongodb://localhost:27017/BlueMoon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    // 1. Nếu đã seed rồi thì bỏ qua
    const existing = await TuThienPayment.countDocuments();
    if (existing > 0) {
      console.log(`⚠️ Đã có ${existing} bản ghi đóng từ thiện. Bỏ qua seed.`);
      return mongoose.connection.close();
    }

    // 2. Lấy danh sách quỹ và các căn hộ đang 'không trống'
    const quys = await QuyTuThien.find().exec();
    const canHos = await CanHo.find({ trangThai: 'không trống' }).exec();

    if (!quys.length) {
      console.log('⚠️ Chưa có quỹ từ thiện nào. Vui lòng seed QuyTuThien trước.');
      return mongoose.connection.close();
    }
    if (!canHos.length) {
      console.log('⚠️ Không có căn hộ nào "không trống". Vui lòng seed CanHo trước.');
      return mongoose.connection.close();
    }

    const payments = [];
    const PAY_PROBABILITY = 0.7; // 70% khả năng đóng
    const MIN_AMOUNT = 100000;
    const MAX_AMOUNT = 600000;

    for (const ch of canHos) {
      for (const q of quys) {
        // Quyết định ngẫu nhiên có đóng quỹ này hay không
        if (Math.random() < PAY_PROBABILITY) {
          const amount = Math.floor(
            Math.random() * (MAX_AMOUNT - MIN_AMOUNT + 1)
          ) + MIN_AMOUNT;

          payments.push({
            idQuyTuThien: q.idQuyTuThien,      // số tự tăng (_id là Number)
            idCanHo: ch.idCanHo,
            soTienDaDong: amount,
            thoiGianDongTien: new Date(),
          });
        }
        // nếu không đóng, không tạo bản ghi
      }
    }

    for (const item of payments) {
        const shk = new TuThienPayment(item);
        await shk.save(); // save sẽ trigger plugin AutoIncrement
    }
    console.log(`✅ Seed thành công: đã tạo ${payments.length} khoản đóng.`);

  } catch (err) {
    console.error('❌ Lỗi khi seed TuThienPayment:', err);
  } finally {
    mongoose.connection.close();
  }
})();