const mongoose = require("mongoose");

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("DB connected sucessfully!!");
		})
		.catch((err) => {
			console.log("Error in DB connection ", err);
		});
};

module.exports = connectDatabase;
