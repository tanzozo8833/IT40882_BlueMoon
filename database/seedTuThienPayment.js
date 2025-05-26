const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const TuThienPayment = require('../src/app/models/TuThienPayment');

// Kết nối DB (hoặc dùng connect của bạn)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/BlueMoon', {
}).then(() => {
    console.log('✅ Kết nối MongoDB thành công');
    seedData();
}).catch(err => console.error('❌ Kết nối MongoDB thất bại:', err));
async function seedData() {
    try {
        await TuThienPayment.deleteMany();
        console.log('🗑️ Đã xoá toàn bộ quỹ từ thiện cũ');

        const seed = [
            { idQuyTuThien: 1, idCanHo: 1, soTienDaDong: 500000, thoiGianDongTien: new Date('2025-05-25') },
            { idQuyTuThien: 1, idCanHo: 2, soTienDaDong: 300000, thoiGianDongTien: new Date('2025-05-26') },
            { idQuyTuThien: 2, idCanHo: 3, soTienDaDong: 700000, thoiGianDongTien: new Date('2025-05-27') }
        ];

        for (const item of seed) {
            const payment = new TuThienPayment(item);
            await payment.save();  // save() sẽ gọi plugin tự động tăng idTuThienPayment
        }

        console.log('🌱 Seed TuThienPayment thành công!');
    } catch (error) {
        console.error('❌ Seed thất bại:', error);
    } finally {
        mongoose.connection.close();
    }
}
