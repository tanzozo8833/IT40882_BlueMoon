// database/seed.js
require('dotenv').config({ path: '../backend/.env' });
const mongoose = require('mongoose');


async function seed() {
  console.log('MONGODB_URI:', process.env.MONGODB_URI);

  // import tất cả các model từ back-end
  const NhanKhau       = require('../backend/models/nhankhau.model');
  const SoHoKhau       = require('../backend/models/sohokhau.model');
  const ChungCu        = require('../backend/models/chungcu.model');
  const CanHo          = require('../backend/models/canho.model');
  const KhoanThu       = require('../backend/models/khoanthu.model');
  const Payment        = require('../backend/models/payment.model');
  const TaiKhoan       = require('../backend/models/taikhoan.model');
  const AuditLog       = require('../backend/models/auditlog.model'); // nếu có

  console.log('✅ Available Mongoose Models:', mongoose.modelNames());
  console.log('MONGODB_URI:', process.env.MONGODB_URI);

  try {
    // 1) Kết nối tới MongoDB và chờ kết nối hoàn tất
    console.log('✅ Connected to MongoDB');

    // 2) Nhân khẩu
    const nk1 = await NhanKhau.create({
      idNhanKhau: 'NK001', hoTen: 'Nguyễn Văn A', biDanh: 'Anh A',
      dob: '1990-01-01', noiSinh: 'Hà Nội', queQuan: 'Hà Nội',
      danToc: 'Kinh', ngheNghiep: 'Giáo viên', noiLamViec: 'Trường THPT X',
      soCCCD: '012345678901', ngayCapCCCD: '2015-05-10', noiCapCCCD: 'Công an TPHN',
      trangThai: 'Đang sống', thongTinKhac: 'Không',
      gioiTinh: 'Nam', soDienThoai: '0912345678', email: 'a@example.com',
      ngayDangKy: new Date()
    });
    const nk2 = await NhanKhau.create({
      idNhanKhau: 'NK002', hoTen: 'Trần Thị B', biDanh: 'Chị B',
      dob: '1992-03-15', noiSinh: 'Hồ Chí Minh', queQuan: 'Hồ Chí Minh',
      danToc: 'Kinh', ngheNghiep: 'Kế toán', noiLamViec: 'Công ty Y',
      soCCCD: '098765432109', ngayCapCCCD: '2017-08-20', noiCapCCCD: 'Công an TP HCM',
      trangThai: 'Đang sống', thongTinKhac: 'Không',
      gioiTinh: 'Nữ', soDienThoai: '0909876543', email: 'b@example.com',
      ngayDangKy: new Date(),
    });

    // 3) Sổ hộ khẩu
    const sh1 = await SoHoKhau.create({
      idSoHoKhau: 'SHK01', soSoHoKhau: '001/2025',
      chuHo: { idNhanKhau: 'NK001', hoTen: nk1.hoTen },
      thanhVien: [
        { idNhanKhau: 'NK001', quanHe: 'Chủ hộ' },
        { idNhanKhau: 'NK002', quanHe: 'Thành viên' }
      ],
      thongTinThem: 'Hộ 2 thành viên',
      diaChi: { sonha: '12', duong: 'Hùng Vương', phuong: 'Nguyễn Du', quan: 'Hai Bà Trưng', thanhPho: 'Hà Nội' },
      ngayCap: '2020-01-01', coQuanCap: 'UBND Quận', hoatDong: true, ghiChu: ''
    });

    // 4) Tài khoản
    await TaiKhoan.create([
      { idTaiKhoan: 'TK001', idSoHoKhau: 'SHK01', email: 'a@example.com', passwordHash: '$2a$10$...', role: 'user', fullName: nk1.hoTen, lastLogin: new Date(), isActive: true, twoFactorEnabled: false, createdAt: new Date() },
      { idTaiKhoan: 'TK002', idSoHoKhau: 'SHK01', email: 'b@example.com', passwordHash: '$2a$10$...', role: 'user', fullName: nk2.hoTen, lastLogin: new Date(), isActive: true, twoFactorEnabled: false, createdAt: new Date() }
    ]);

    // 5) Chung cư
    const cc1 = await ChungCu.create({
      idChungCu: 'CC01', loai: 'A', phiQuanLy: 50000,
      tenChungCu: 'Sun Tower', diaChi: '123 Lê Lợi, Hà Nội',
      soTang: 25, chuDauTu: 'Công ty X', lienHe: { hotline: '19001234', email: 'info@suntower.vn' }
    });

    // 6) Căn hộ
    await CanHo.create([
      { idCanHo: 'CH01', idChungCu: 'CC01', idSoHoKhau: 'SHK01', soXeMay: 1, soOTo: 1, dienTich: 75, tang: 10, huong: 'Đông', trangThai: 'Đang sử dụng', thoiGianThue: { batDau: '2022-01-01', ketThuc: null }, ghiChu: '' }
    ]);

    // 7) Khoản thu (quỹ & phí)
    await KhoanThu.create([
      { idKhoanThu: 'KT001', type: 'QUY', idChungCu: 'CC01', batBuoc: true, soTien: 100000, chiTiet: 'Quỹ bảo trì', ngayBatDau: '2024-01-01', ngayKetThuc: '2024-12-31' },
      { idKhoanThu: 'KT002', type: 'PHI', idCanHo: 'CH01', loaiPhi: 'ĐIỆN', soTien: 500000, moTa: 'Tháng 3/2025', trangThai: 'Mở', ngayBatDau: '2025-03-01', ngayKetThuc: '2025-03-31', kyPhi: '2025-03' }
    ]);

    // 8) Payment
    await Payment.create([
      { idPayment: 'PMT001', idKhoanThu: 'KT002', idCanHo: 'CH01', thoiGianDong: '2025-03-15', soTienDong: 500000, phuongThuc: 'Chuyển khoản', maGiaoDich: 'TX123', nguoiThu: 'TK001', ghiChu: '' }
    ]);

    // 9) AuditLog (nếu dùng)
    if (AuditLog) {
      await AuditLog.create({
        logId: 'LOG001', idTaiKhoan: 'TK001', changeType: 'CREATE', description: 'Tạo nhân khẩu NK001', targetCollection: 'nhankhau', targetId: nk1._id.toString(), timestamp: new Date(), ipAddress: '127.0.0.1'
      });
    }

    console.log('✅ Seeding completed');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    // Đóng kết nối để script kết thúc
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
