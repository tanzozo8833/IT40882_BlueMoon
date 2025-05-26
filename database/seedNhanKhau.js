const mongoose = require('mongoose');
const NhanKhau = require('../src/app/models/NhanKhau');
const SoHoKhau = require('../src/app/models/SoHoKhau');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon');

(async () => {
    try {
        // Tìm một vài sổ hộ khẩu để gán cho nhân khẩu
        const hoKhauList = await SoHoKhau.find().limit(2);

        if (hoKhauList.length === 0) {
            console.log('⚠️ Chưa có sổ hộ khẩu nào trong DB. Vui lòng seed SoHoKhau trước.');
            return mongoose.connection.close();
        }

        const nhanKhaus = [
            {
                idSoHoKhau: hoKhauList[0].idSoHoKhau,
                quanHeVoiChuHo: 'Chủ hộ',
                hoTen: 'Nguyễn Văn A',
                biDanh: 'Ba',
                ngaySinh: new Date('1980-01-01'),
                noiSinh: 'Hà Nội',
                queQuan: 'Nam Định',
                danToc: 'Kinh',
                ngheNghiep: 'Công nhân',
                noiLamViec: 'Công ty ABC',
                soCCCD: '012345678901',
                ngayCap: new Date('2018-05-01'),
                noiCap: 'Cục Cảnh sát QLHC',
                trangThai: 'Thường trú',
                thongTinKhac: ''
            },
            {
                idSoHoKhau: hoKhauList[0].idSoHoKhau,
                quanHeVoiChuHo: 'Vợ',
                hoTen: 'Trần Thị B',
                biDanh: '',
                ngaySinh: new Date('1983-03-12'),
                noiSinh: 'Hà Nội',
                queQuan: 'Hà Nam',
                danToc: 'Kinh',
                ngheNghiep: 'Giáo viên',
                noiLamViec: 'Trường THCS X',
                soCCCD: '123456789012',
                ngayCap: new Date('2019-07-21'),
                noiCap: 'Cục Cảnh sát QLHC',
                trangThai: 'Thường trú',
                thongTinKhac: ''
            },
            {
                idSoHoKhau: hoKhauList[1].idSoHoKhau,
                quanHeVoiChuHo: 'Chủ hộ',
                hoTen: 'Phạm Văn C',
                biDanh: '',
                ngaySinh: new Date('1990-06-15'),
                noiSinh: 'TP.HCM',
                queQuan: 'Bình Dương',
                danToc: 'Kinh',
                ngheNghiep: 'IT',
                noiLamViec: 'Công ty XYZ',
                soCCCD: '234567890123',
                ngayCap: new Date('2020-02-01'),
                noiCap: 'TP.HCM',
                trangThai: 'Tạm trú',
                thongTinKhac: 'Chuyển đến năm 2021'
            }
        ];

        for (const nk of nhanKhaus) {
            const nhanKhau = new NhanKhau(nk);
            await nhanKhau.save();
        }
        console.log('✅ Seed nhân khẩu thành công!');
    } catch (err) {
        console.error('❌ Lỗi khi seed nhân khẩu:', err.message);
    } finally {
        mongoose.connection.close();
    }
})();
