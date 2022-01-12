const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/index");
dotenv.config({ path: "./config/.env" });

const app = express();

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(
				"DB connected and Server is Running at PORT: ",
				process.env.PORT
			);
		});
	})
	.catch((err) => {
		console.log("Error in DB connection ", err);
	});

app.use(express.json());
app.use(routes);
