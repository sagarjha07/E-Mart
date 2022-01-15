const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

router.post("/resetPasswordMail", userController.resetTokenMail);
router.put("/passwordRecovery/:token", userController.passwordRecovery);

module.exports = router;
