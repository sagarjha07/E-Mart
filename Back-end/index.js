const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const connectDatabase = require("./config/DB_config");
const routes = require("./routes/index");
const errorMiddleware = require("./middleware/error");

const app = express();

// // Handling Uncaught Exception
// process.on("uncaughtException", (err) => {
// 	console.log(`Error: ${err.message}`);
// 	console.log(`Shutting down the server due to Uncaught Exception`);
// 	process.exit(1);
// });

connectDatabase();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

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
