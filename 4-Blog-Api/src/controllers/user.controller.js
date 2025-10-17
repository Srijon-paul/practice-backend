import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {v2 as cloudinary} from "cloudinary";

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

	const avatarLocalPath = req.file?.path;
	if(!avatarLocalPath){
		throw new ApiError(400, "Avatar is required");
	}
	const avatar = await uploadOnCloudinary(avatarLocalPath);
	if(!avatar){
		throw new ApiError(400, "Avatar is required");
	}
	
	const user = await User.create({
		name,
		email,
		password,
		avatar: avatar.url,
		avatarId: avatar.public_id
	})
	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	)
	if(!createdUser){
		if(avatar?.public_id){
			await cloudinary.uploader.destroy(avatar.public_id)
		}
		throw new ApiError(500, "Something went wrong while registering the user !!");
	}
	return res.status(201).json(
		new ApiResponse(200, "User Registered Succesfully", createdUser)
	)
})

const loginUser = asyncHandler(async(req, res) => {
	const {email, password} = req.body;
	if(!email || !password){
		throw new ApiError(400, "All fields are required!")
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
		new ApiResponse(200, "User Logged In Successfully", {loggedInUser})
	)
})

const logoutUser = asyncHandler(async(req, res) => {
	User.findByIdAndUpdate(req.user._id, {
		$set: {
			refreshToken: undefined
		}
	},{new: true})

	const options = {
		httpOnly: true,
		secure: true
	}

	return res.status(200)
	.clearCookie("accessToken", options)
	.clearCookie("refreshToken", options)
	.json(new ApiResponse(200, {}, "User LoggedOut successfully"))
})

const refreshAccessToken = asyncHandler(async(req, res) => {
	const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken
	if(!incomingrefreshToken){
		throw new ApiError(400, "Unauthorize Request")
	}

	try {
		const decodedToken = jwt.verify(incomingrefreshToken, process.env.REFRESH_TOKEN_SECRET)
		const user = await User.findById(decodedToken?._id);
		if(!user){
			throw new ApiError(400, "Invalid Refresh Token!")
		}
		if(incomingrefreshToken !== user.refreshToken){
			throw new ApiError(400, "Refresh Token Expired or Used")
		}

		const options = {
			httpOnly: true,
			secure: true
		}

		const {accessToken, newrefreshToken} = await generateAccessAndRefreshToken(user._id);

		return res.status(200)
		.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", newrefreshToken, options)
		.json(
			new ApiResponse(200, {accessToken, refreshToken: newrefreshToken} || "Access Token Refreshed")
		)
	} catch (error) {
		throw new ApiError(401, error?.message || "Invalid Refresh Token")
	}
})

const changePassword = asyncHandler(async(req, res) => {
	const {oldPassword, newPassword} = req.body;
	if(!(oldPassword || newPassword)){
		throw new ApiError(400, "Password cannot be empty")
	}
	const user = await User.findById(req.user._id);
	if(!user){
		throw new ApiError(400, "User not found!");
	}
	const isPasswordValid = await user.isPasswordCorrect(oldPassword);
	if(!isPasswordValid){
		throw new ApiError(400, "Invalid old password!")
	}
	user.password = newPassword;
	user.save();

	return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully!"));
})

const updateEmail = asyncHandler(async(req, res) => {
	const {email} = req.body;
	if(!email){
		throw new ApiError(400, "Email is required!");
	}
	const user = await User.findByIdAndUpdate(req.user?._id, {
		$set: {
			email: email
		}
	},{new: true}).select("-password")
	
	return res.status(200).json(
		new ApiResponse(200, user, "Email updated Successfully")
	)
})

const updateAvatar = asyncHandler(async(req, res) => {
	const avatarLocalPath = req.file?.path;
	if(!avatarLocalPath){
		throw new ApiError(400, "avatar is required!")
	}
	const oldUser = await User.findById(req.user?._id);
	if(!oldUser){
		throw new ApiError(400, "Failed to fetch old user");
	}
	if(oldUser.avatarId){
		await cloudinary.uploader.destroy(oldUser.avatarId);
	}

	const avatar = await uploadOnCloudinary(avatarLocalPath);
	if(!avatar){
		throw new ApiError(400, "avatar is required!");
	}

	const user = await User.findByIdAndUpdate(req.user?._id,{
		$set: {
			avatar: avatar.url,
			avatarId: avatar.public_id
		}
	},
	{new: true}).select("-password -refreshToken");

	return res.status(200).json(
		new ApiResponse(200, user, "Avatar successfully updated")
	)
})

const getCurrentUser = asyncHandler(async(req, res) => {
	const user = req.user;
	if(!user){
		throw new ApiError(400, "User not Logged in or Does not Exist")
	}
	return res.status(200).json(new ApiResponse(200, user, "details fetched succesfully"))
})

export {
	registerUser,
	loginUser,
	logoutUser,
	refreshAccessToken,
	changePassword,
	updateEmail,
	getCurrentUser,
	updateAvatar,
}
