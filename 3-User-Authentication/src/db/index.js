import { DB_Name } from "../constants.js";
import mongoose from "mongoose";

const connectDb = async () => {
	try {
		const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
		console.log("MongoDb Successfully Connected...DB-HOST: ", connectionInstance.connection.host);
	} catch (error) {
		console.log("MongoDb Connection Failed!!", error);
		process.exit(1);
	}
}

export default connectDb;