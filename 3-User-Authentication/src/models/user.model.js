import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const User = mongoose.Schema({
	name : {
		type: String,
		required: true,
		trim: true
	},
	email : {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: {
		type: String,
	}
},
{
	timestamps: true
});