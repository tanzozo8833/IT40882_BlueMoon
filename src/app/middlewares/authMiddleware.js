function authMiddleware(req, res, next) {
    // Gán thông tin đăng nhập vào biến cục bộ nếu cần dùng ở views
    res.locals.isAuthenticated = !!(req.session && req.session.taiKhoan);
    res.locals.currentUser = req.session?.taiKhoan || null;
    next();
}

authMiddleware.ensureAuthenticated = function (req, res, next) {
    if (req.session && req.session.taiKhoan) {
        return next();
    }
    res.status(401).send('Bạn cần đăng nhập');
};

authMiddleware.requireRole = function (roles) {
    return function (req, res, next) {
        if (!req.session || !req.session.taiKhoan || !roles.includes(req.session.taiKhoan.role)) {
            return res.status(403).send('Không có quyền truy cập');
        }
        next();
    };
};

module.exports = authMiddleware;