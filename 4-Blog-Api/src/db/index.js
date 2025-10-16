import mongoose from "mongoose";
import { Db_name } from "../constant.js";

const connectDb = async() => {
	try {
		const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${Db_name}`);
		console.log("mongoDb successfully connected! DB Host: ", connectionInstance.connection.host);
	} catch (error) {
		console.log("MongoDb connection failed!!", error);
		process.exit(1);
	}
}

export default connectDb;