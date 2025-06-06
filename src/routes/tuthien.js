const express = require("express");
const router = express.Router();

const tuthienController = require("../app/controllers/TuThienController");

// Danh sách đóng góp
router.get("/", tuthienController.show);
router.get("/:idslug/chinh-sua", tuthienController.edit);
router.post("/:idslug/chinh-sua", tuthienController.update);

// Thêm mới
router.get("/them", tuthienController.create);
router.post("/", tuthienController.store);

// Xem chi tiết
router.get("/:idslug", tuthienController.detail);
router.get("/:idslug/ungho", tuthienController.formungho);
//Ủng hộ
router.post("/:idslug", tuthienController.ungho);
module.exports = router;
