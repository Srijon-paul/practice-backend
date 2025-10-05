import { Router } from "express";
import { createTask, deleteTask } from "../controllers/task.controller.js";

const router = Router();

router.route("/createtask").post(createTask);
router.route("/deletetask/:task").delete(deleteTask);

export default router