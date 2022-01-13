const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(new ErrorHandler("Please Login to access this resource", 401));
	}

	const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

	req.user = await User.findById(decodedData.id);

	next();
});

module.exports.isAdmin = catchAsyncError(async (req, res, next) => {
	if (req.user.role != "admin") {
		return next(
			new ErrorHandler(`${req.user.role} is not allowed to use this resource`)
		);
	}
	next();
});
