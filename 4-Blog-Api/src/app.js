import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
	origin: process.env.CORS_ORIGIN,
	credentials: true
}));
app.use(express.json({
	limit: "32kb",
}));
app.use(express.urlencoded({
	limit: "16kb",
	extended: true
}))
app.use(cookieParser());

import router from "./routes/user.route.js";
app.use("/api/users", router);
import postRouter from "./routes/post.route.js";
app.use("/api/posts", postRouter);

export {app}
