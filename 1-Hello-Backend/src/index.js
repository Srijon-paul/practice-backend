import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "./.env" })
const port = process.env.PORT;

app.get("/", (req, res) => {
	res.send("hello from Hello-Backend");
})

app.get("/about", (req, res) => {
	res.send("<h1>this is Srijon....say hello</h1>")
})

app.listen(port, () => {
	console.log(`app is listening on port ${port}`);
})