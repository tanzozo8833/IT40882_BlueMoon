const mongoose = require('mongoose');
const QuyTuThien = require('../src/app/models/QuyTuThien');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon');

(async () => {
    try {
        // Xóa dữ liệu cũ
        await QuyTuThien.deleteMany({});
        console.log('🗑️ Đã xoá toàn bộ quỹ từ thiện cũ');

        // Reset AutoIncrement (_idQuyTuThien)
        // Dữ liệu seed
        const today = new Date();
        const quytuthienData = [
            {
                tenQuy: 'Quỹ Học Bổng Mùa Hè',
                mota: 'Hỗ trợ học sinh nghèo vượt khó mùa hè',
                ngayBatDau: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
                ngayKetThuc: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30),
            },
            {
                tenQuy: 'Quỹ Giúp Đỡ Trẻ Em Mồ Côi',
                mota: 'Gây quỹ giúp đỡ trẻ em không nơi nương tựa',
                ngayBatDau: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10),
                ngayKetThuc: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
            },
            {
                tenQuy: 'Quỹ Bảo Vệ Môi Trường',
                mota: 'Gây quỹ cho các hoạt động bảo vệ môi trường',
                ngayBatDau: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30),
                ngayKetThuc: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
            },
        ];

        // Insert dữ liệu mới
        for (const item of quytuthienData) {
            const quy = new QuyTuThien(item);
            await quy.save();
        }

        console.log('✅ Seed quỹ từ thiện thành công!');
    } catch (err) {
        console.error('❌ Lỗi khi seed:', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
