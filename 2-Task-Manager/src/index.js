import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config({path: "./.env"});
const app = express();
const port = process.env.PORT;

connectDb()
.then(() => {
	app.listen(port, () => {
		console.log("server is listening on", port);
	})
})
.catch((error) => {
	console.log("mongodb connection failed!", error);
})