import {Router} from "express";
import { changePassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAvatar, updateEmail } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/registeruser").post(
	upload.single('avatar'),
	registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/changepassword").post(verifyJWT, changePassword);
router.route("/updateemail").patch(verifyJWT, updateEmail);
router.route("/getuser").get(verifyJWT, getCurrentUser);
router.route("/updateavatar").patch(verifyJWT, upload.single("avatar"), updateAvatar);

export default router;
