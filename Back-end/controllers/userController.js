const ErrorHandler = require("../utils/errorHandler");
const errorMiddleware = require("../middleware/error");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const crypto = require("crypto");
const generateToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

//register
module.exports.register = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({ name, email, password });
	generateToken(user, 201, res);
});

//login
module.exports.login = catchAsyncError(async (req, res, next) => {
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

//logout
module.exports.logout = catchAsyncError(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
	return res.status(200).json({
		success: true,
		message: "Logged out successfully!!",
	});
});

//forgot password mail
module.exports.resetTokenMail = catchAsyncError(async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHandler("User doesn't exist with this email!!", 401));
	}

	const resetToken = await user.resetPassword();
	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/users/passwordRecovery/${resetToken}`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: `E-mart Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

//password recovery
module.exports.passwordRecovery = catchAsyncError(async (req, res, next) => {
	const resetPasswordToken = await crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				"Reset Password Token is invalid or has been expired",
				400
			)
		);
	}
	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHander("Password does not password", 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	generateToken(user, 200, res);
});
