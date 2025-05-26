const mongoose = require('mongoose');
const NhanKhau = require('../src/app/models/NhanKhau');
const SoHoKhau = require('../src/app/models/SoHoKhau');

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/BlueMoon');

(async () => {
    try {
        // Tìm một vài sổ hộ khẩu để gán cho nhân khẩu
        const hoKhauList = await SoHoKhau.find().limit(15);

        if (hoKhauList.length === 0) {
            console.log('⚠️ Chưa có sổ hộ khẩu nào trong DB. Vui lòng seed SoHoKhau trước.');
            return mongoose.connection.close();
        }

        const nhanKhaus = [
            {
                idSoHoKhau: hoKhauList[0].idSoHoKhau,
                quanHeVoiChuHo: 'Chủ hộ',
                hoTen: 'Nguyễn Văn K',
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
                hoTen: 'Trần Thị Thu B',
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
                hoTen: 'Trần Thị P',
                biDanh: '',
                ngaySinh: new Date('1963-05-16'),
                noiSinh: 'Hà Nội',
                queQuan: 'Hà Tĩnh',
                danToc: 'Kinh',
                ngheNghiep: 'Bất động sản',
                noiLamViec: 'Công ty XMAN',
                soCCCD: '896556789012',
                ngayCap: new Date('2019-09-20'),
                noiCap: 'Cục Cảnh sát QLHC',
                trangThai: 'Thường trú',
                thongTinKhac: 'Không có'
            },
            {
                idSoHoKhau: hoKhauList[2].idSoHoKhau,
                quanHeVoiChuHo: 'Chủ hộ',
                hoTen: 'Phạm Văn L',
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
            },
            {
                idSoHoKhau: hoKhauList[2].idSoHoKhau,
                quanHeVoiChuHo: 'Vo',
                hoTen: 'Nguyen Thi ABC',
                biDanh: 'trum',
                ngaySinh: new Date('1991-08-18'),
                noiSinh: 'TP.HCM',
                queQuan: 'TP.HCM',
                danToc: 'Kinh',
                ngheNghiep: 'Marketing',
                noiLamViec: 'Công ty nao do',
                soCCCD: '234567898765',
                ngayCap: new Date('2021-02-02'),
                noiCap: 'TP.HCM',
                trangThai: 'Thuong trú',
                thongTinKhac: 'Chuyển đến năm 2021'
            },
            {
                idSoHoKhau: hoKhauList[2].idSoHoKhau,
                quanHeVoiChuHo: 'Con trai',
                hoTen: 'Hoang Van Y',
                biDanh: 'khong co',
                ngaySinh: new Date('2024-07-07'),
                noiSinh: 'TP.HCM',
                queQuan: 'TP.HCM',
                danToc: 'Kinh',
                ngheNghiep: 'Khong co',
                noiLamViec: 'khong co',
                soCCCD: '234567899999',
                ngayCap: new Date('2025-01-01'),
                noiCap: 'TP.HCM',
                trangThai: 'Thuong trú',
                thongTinKhac: 'Moi sinh'
            },
            {
                idSoHoKhau: hoKhauList[2].idSoHoKhau,
                quanHeVoiChuHo: 'Con gai',
                hoTen: 'Do Thi LMN',
                biDanh: 'khong co',
                ngaySinh: new Date('2022-08-28'),
                noiSinh: 'TP.HCM',
                queQuan: 'TP.HCM',
                danToc: 'Kinh',
                ngheNghiep: 'hoc sinh',
                noiLamViec: 'khong co',
                soCCCD: '234567898888',
                ngayCap: new Date('2023-05-05'),
                noiCap: 'TP.HCM',
                trangThai: 'Thuong trú',
                thongTinKhac: 'tre em'
            },
            {
                idSoHoKhau: hoKhauList[3].idSoHoKhau,
                quanHeVoiChuHo: 'Chủ hộ',
                hoTen: 'Nguyễn Văn N',
                biDanh: 'NamTienTy',
                ngaySinh: new Date('1997-09-11'),
                noiSinh: 'Đà Nẵng',
                queQuan: 'Đà Nẵng',
                danToc: 'Kinh',
                ngheNghiep: 'PM',
                noiLamViec: 'Công ty ARapt',
                soCCCD: '548967890123',
                ngayCap: new Date('2020-02-01'),
                noiCap: 'Đà Nẵng',
                trangThai: 'Tạm trú',
                thongTinKhac: 'Người trẻ tuổi'
            },
            {
                idSoHoKhau: hoKhauList[3].idSoHoKhau,
                quanHeVoiChuHo: 'Vo',
                hoTen: 'Nguyen Thi Hoai N',
                biDanh: 'NhantoX',
                ngaySinh: new Date('1997-12-12'),
                noiSinh: 'TP.HCM',
                queQuan: 'TP.HCM',
                danToc: 'Kinh',
                ngheNghiep: 'Lam ruong',
                noiLamViec: 'Canh dong',
                soCCCD: '234567891489',
                ngayCap: new Date('2020-08-12'),
                noiCap: 'TP.HCM',
                trangThai: 'Tam trú',
                thongTinKhac: 'Vo cua nguoi tre'
            },
            {
                idSoHoKhau: hoKhauList[3].idSoHoKhau,
                quanHeVoiChuHo: 'Con trai',
                hoTen: 'Nguyen Van O',
                biDanh: 'khong co',
                ngaySinh: new Date('2023-04-17'),
                noiSinh: 'TP.HCM',
                queQuan: 'Da Nang',
                danToc: 'Kinh',
                ngheNghiep: 'Khong co',
                noiLamViec: 'khong co',
                soCCCD: '234567899997',
                ngayCap: new Date('2024-04-12'),
                noiCap: 'TP.HCM',
                trangThai: 'Tam trú',
                thongTinKhac: 'tre em sinh doi'
            },
            {
                idSoHoKhau: hoKhauList[3].idSoHoKhau,
                quanHeVoiChuHo: 'Con Trai',
                hoTen: 'Nguyen Van U',
                biDanh: 'khong co',
                ngaySinh: new Date('2023-04-17'),
                noiSinh: 'TP.HCM',
                queQuan: 'Da Nang',
                danToc: 'Kinh',
                ngheNghiep: 'hoc sinh',
                noiLamViec: 'khong co',
                soCCCD: '234567895479',
                ngayCap: new Date('2024-04-12'),
                noiCap: 'TP.HCM',
                trangThai: 'Tam trú',
                thongTinKhac: 'tre em sinh doi'
            },
            {
                idSoHoKhau: hoKhauList[4].idSoHoKhau,
                quanHeVoiChuHo: 'Chủ hộ',
                hoTen: 'Đặng Đình R',
                biDanh: 'RRRRRRRRR',
                ngaySinh: new Date('1983-05-14'),
                noiSinh: 'Đà Nẵng',
                queQuan: 'Đà Nẵng',
                danToc: 'Kinh',
                ngheNghiep: 'Dev',
                noiLamViec: 'Công ty AKsante',
                soCCCD: '548967895467',
                ngayCap: new Date('2020-12-01'),
                noiCap: 'Đà Nẵng',
                trangThai: 'Thuong trú',
                thongTinKhac: 'Khong'
            },
            {
                idSoHoKhau: hoKhauList[4].idSoHoKhau,
                quanHeVoiChuHo: 'Vo',
                hoTen: 'Ta Thi N',
                biDanh: 'NNN',
                ngaySinh: new Date('1982-02-10'),
                noiSinh: 'TP.HCM',
                queQuan: 'TP.HCM',
                danToc: 'Kinh',
                ngheNghiep: 'Khong',
                noiLamViec: 'Khong',
                soCCCD: '234567898956',
                ngayCap: new Date('2020-07-12'),
                noiCap: 'TP.HCM',
                trangThai: 'Thuong trú',
                thongTinKhac: 'Khong'
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
