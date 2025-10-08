import { Router } from "express";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/task.controller.js";

const router = Router();

router.route("/createtask").post(createTask);
router.route("/deletetask/:task").delete(deleteTask);
router.route("/gettask/:task").get(getTask);
router.route("/updatetask/:task").patch(updateTask);

export default router