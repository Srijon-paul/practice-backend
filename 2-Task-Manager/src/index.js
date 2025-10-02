import express from "express";
import dotenv from "dotenv";
import { app } from "./app.js"; // keeeeeep in minddd
import connectDb from "./db/index.js";

dotenv.config({path: "./.env"});
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