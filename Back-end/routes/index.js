const express = require("express");
const router = express.Router();
const productRoute = require("./product");

router.use("/api/v1/products",productRoute);

module.exports = router;
