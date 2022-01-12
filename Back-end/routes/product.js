const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/getProduct/:id", productController.getProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.post("/createProduct", productController.createProduct);
router.put("/updateProduct/:id", productController.updateProduct);
router.delete("/removeProduct/:id", productController.removeProduct);

module.exports = router;
