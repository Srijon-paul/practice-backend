import mongoose from "mongoose";
import { DB_name } from "../constants.js";

const connectDb = async() => {
	try {
		const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
		console.log("mongoDB successfully connected!! DB HOST: ", connectionInstance.connection.host);
	} catch (error) {
		console.log("mongoDB connection failed!!", error);
		process.exit(1);
	}
}

export default connectDb;