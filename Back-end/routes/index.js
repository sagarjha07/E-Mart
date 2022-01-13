const express = require("express");
const router = express.Router();
const productRoute = require("./product");
const userRoute = require("./user");

router.use("/api/v1/products", productRoute);
router.use("/api/v1/users", userRoute);

module.exports = router;
