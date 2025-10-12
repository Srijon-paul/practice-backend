import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
	try {
		const user = await User.findById(userId);
		const accessToken = await user.generateAccessToken();
		const refreshToken = await user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({validateBeforeSave: false});
		
		return {accessToken, refreshToken}
	} catch (error) {
		throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
	}
}

const registerUser = asyncHandler(async(req, res) => {
	const {name, email, password} = req.body;

	if([name, email, password].some((field) => field?.trim() === "")){
		throw new ApiError(400, "Fields cannot be empty!!");
	}
	const existedUser = await User.findOne({email});
	if(existedUser){
		throw new ApiError(409, "Email already Registered!!");
	}
	
	const user = await User.create({
		name,
		email,
		password
	})
	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	)
	if(!createdUser){
		throw new ApiError(500, "Something went wrong while registering the user !!");
	}
	return res.status(201).json(
		new ApiResponse(200, "User Registered Succesfully", createdUser)
	)
})

const loginUser = asyncHandler(async(req, res) => {
	const {email, password} = req.body;
	if(!email){
		throw new ApiError(400, "Email is required!")
	}

	const user = await User.findOne({email});
	if(!user){
		throw new ApiError(404, "user does not exist!")
	}

	const isPasswordValid = await user.isPasswordCorrect(password);
	if(!isPasswordValid){
		throw new ApiError(401, "Invalid Credentials!");
	}

	const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
	const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
	const option = {
		httpOnly: true,
		secure: true
	}

	return res.status(200)
	.cookie("accessToken", accessToken, option)
	.cookie("refreshToken", refreshToken, option)
	.json(
		new ApiResponse(200, "User Logged In Successfully", {loggedInUser, refreshToken, accessToken})
	)
})

export {
	registerUser,
	loginUser,
}
