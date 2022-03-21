var express = require("express");
var authController = require("../controller/authController");
var router = express.Router();

router.post("/login", authController.login);
router.post("/registrasi", authController.registrasi);
router.get("/verifikasi", authController.verifikasi)

module.exports = router;
