const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");

module.exports.getProduct = catchAsyncError(async (req, res) => {
	const product = await Product.findById(req.params.id);
	return res.status(200).json({
		success: true,
		product,
	});
});

module.exports.getAllProducts = catchAsyncError(async (req, res) => {
	const resultPerPage = 5;
	const productCount = await Product.countDocuments();
	const apifeature = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resultPerPage);

	const products = await apifeature.query;
	return res.status(200).json({
		success: true,
		products,
		productCount,
	});
});

module.exports.createProduct = catchAsyncError(async (req, res) => {
	req.body.user = req.user.id;
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
