const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/index");
const errorMiddleware = require("./middleware/error");

dotenv.config({ path: "./config/.env" });

const app = express();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Uncaught Exception`);
	process.exit(1);
});


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

app.use(express.json());
app.use(errorMiddleware);
app.use(routes);

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Unhandled Promise Rejection`);

	server.close(() => {
		process.exit(1);
	});
});
