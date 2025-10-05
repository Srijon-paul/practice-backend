import mongoose from "mongoose";
import { Task } from "../models/tasks.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
	// 1. taking tasks as input from the user at frontend
	// 2. checking whether they are empty or not
	// 3. entry in db
	// 4. check for task creation
	// 5. return the response

	const {title, description} = req.body;
	console.log("Title: ", title);

	if([title, description].some((field) => field?.trim() === "")){
		throw new ApiError(400, "Fields cannot be empty!!")
	}
	const task = await Task.create({
		title,
		description
	})
	const createdTask = await Task.findById(task._id);

	if(!createdTask){
		throw new ApiError(400, "Some problem arises while creating task")
	}
	return res.status(201).json(
		new ApiResponse(201, "Task created succesfully", createdTask)
	)
})

const deleteTask = asyncHandler(async (req, res) => {
	const {task} = req.params;
	if(!task){
		throw new ApiError(400, "Task not found!");
	}
	const deletedTask = await Task.findByIdAndDelete(task)
	if(!deletedTask){
		throw new ApiError(400, "Task not found!")
	}
	return res.status(200).json(
		new ApiResponse(200, "Task successfully deleted", task)
	)
})

export {
	createTask,
	deleteTask,
}