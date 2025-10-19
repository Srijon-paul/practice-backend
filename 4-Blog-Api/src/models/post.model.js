import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	image: {
		imageId: {
			type: String,
			required: true
		},
		imageUrl: {
			type: String,
			required: true
		}
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
},{timestamps: true})

export const Post = mongoose.model("Post", postSchema);