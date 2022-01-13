const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const connectDatabase = require("./config/DB_config");
const ErrorHandler = require("./utils/errorHandler");
const errorMiddleware = require("./middleware/error");
const routes = require("./routes/index");

const app = express();
connectDatabase();

app.use(express.json());
app.use(routes);

app.all("*", (req, res, next) => {
	next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
	console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
