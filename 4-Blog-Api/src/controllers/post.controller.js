import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {v2 as cloudinary} from "cloudinary";

const createPost = asyncHandler(async (req, res) => {
	const {title, content} = req.body;
	if(!title && !content){
		throw new ApiError(400, "Title and Content are required!");
	}
	const imageLocalPath = req.file?.path;
	if(!imageLocalPath){
		throw new ApiError(400, "Image of post is required!");
	}
	const image = await uploadOnCloudinary(imageLocalPath);
	if(!image){
		throw new ApiError(400, "Image of post is required!");
	}
	const post = await Post.create({
		title,
		content,
		image: {
			imageId: image.public_id,
			imageUrl: image.url
		},
		author: req.user._id,
		likes: [],
		comments: []
	});
	const createdPost = await Post.findById(post._id);
	if(!createdPost){
		if(image?.public_id){
			await cloudinary.uploader.destroy(image.public_id);
		}
		throw new ApiError(500, "Something Went Wrong while creating the Post");
	}
	return res.status(200).json(
		new ApiResponse(201, "Post Created Successfully!", createdPost)
	)
});

const updatePost = asyncHandler(async(req, res) => {
	const {postId} = req.params;
	const post = await Post.findById(postId);
	if(!post){
		throw new ApiError(404, "Post Not Found!");
	}
	if(post.author.toString() !== req.user._id.toString()){
		throw new ApiError(404, "Unauthorized update are forbidden!")
	}
	const {title, content} = req.body;
	if(title){
		
	}
})

export {
	createPost,
}