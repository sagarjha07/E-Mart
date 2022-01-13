const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
	isAuthenticatedUser,
	isAdmin,
} = require("../middleware/authMiddleware");

router.get("/getProduct/:id", productController.getProduct);
router.get("/getAllProducts", productController.getAllProducts);

router.post(
	"/createProduct",
	isAuthenticatedUser,
	isAdmin,
	productController.createProduct
);
router.put(
	"/updateProduct/:id",
	isAuthenticatedUser,
	isAdmin,
	productController.updateProduct
);
router.delete(
	"/removeProduct/:id",
	isAuthenticatedUser,
	isAdmin,
	productController.removeProduct
);

module.exports = router;
