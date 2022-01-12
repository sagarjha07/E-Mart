const Product = require("../models/productModel");

module.exports.getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	return res.status(200).json({
		success: true,
		product,
	});
};

module.exports.getAllProducts = async (req, res) => {
	const product = await Product.find({});
	return res.status(200).json({
		success: true,
		product,
	});
};

module.exports.createProduct = async (req, res) => {
	try {
		const newproduct = await Product.create(req.body);
		return res.status(201).json({
			success: true,
			product: newproduct,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			err: error.message,
		});
	}
};

module.exports.updateProduct = async (req, res) => {
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
};

module.exports.removeProduct = async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	return res.status(200).json({
		success: true,
	});
};
