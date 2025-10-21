import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const postRouter = Router();

postRouter.route("/createpost").post(
	verifyJWT, 
	upload.single("image"), 
	createPost
);

export default postRouter;