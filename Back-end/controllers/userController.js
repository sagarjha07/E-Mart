const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsync");
const generateToken = require("../utils/jwtToken");

module.exports.register = catchAsyncError(async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.create({ name, email, password });
	generateToken(user, 201, res);
});

module.exports.login = catchAsyncError(async (req, res) => {
	const { email, password } = req.body;

	// checking if user has given password and email both

	if (!email || !password) {
		return next(new ErrorHandler("Please Enter Email & Password", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}
	generateToken(user, 200, res);
});

module.exports.logout = catchAsyncError(async (req, res) => {});
