import { Router } from "express";
import { createPost, getPost, updatePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const postRouter = Router();

postRouter.route("/createpost").post(
	verifyJWT, 
	upload.single("image"), 
	createPost
);
postRouter.route("/updatepost/:postId").patch(
	verifyJWT,
	upload.single("image"),
	updatePost
);
postRouter.route("/post/:postId").get(getPost);

export default postRouter;