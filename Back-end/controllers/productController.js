const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/errorHandler");

module.exports.getProduct = catchAsyncError(async (req, res) => {
	const product = await Product.findById(req.params.id);
	return res.status(200).json({
		success: true,
		product,
	});
});

module.exports.getAllProducts = catchAsyncError(async (req, res) => {
	const product = await Product.find({});
	return res.status(200).json({
		success: true,
		product,
	});
});

module.exports.createProduct = catchAsyncError(async (req, res) => {
	const product = await Product.create(req.body);
	return res.status(201).json({
		success: true,
		product,
	});
});

module.exports.updateProduct = catchAsyncError(async (req, res) => {
	let product = await Product.findById(req.params.id);
	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	return res.status(200).json({
		success: true,
		product,
	});
});

module.exports.removeProduct = catchAsyncError(async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	return res.status(200).json({
		success: true,
	});
});
