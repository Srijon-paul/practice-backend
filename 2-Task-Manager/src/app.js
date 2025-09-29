import express, {urlencoded, json} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
	origin: process.env.CORS_ORIGIN,
	credentials: true,
}))
app.use(json({
	limit: "16kb"
}))
app.use(urlencoded({
	limit: "16kb",
	extended: true
}))
app.use(cookieParser());

export {app}