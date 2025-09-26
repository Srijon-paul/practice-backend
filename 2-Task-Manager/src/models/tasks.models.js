import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
	title: {
		type: "String",
		required: true,
		trim: true
	},
	description: {
		type: "String",
		trim: true
	},
	status: {
		type: "String",
		enum: ["PENDING", "COMPLETED"],
		default: "PENDING"
	}
}, {timestamps: true});

export const Task = mongoose.model("Task", taskSchema);