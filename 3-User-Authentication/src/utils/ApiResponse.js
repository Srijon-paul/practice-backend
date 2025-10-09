class ApiResponse{
	constructor(
		statuscode,
		message = "success",
		data
	){
		super(message);
		this.statuscode = statuscode;
		this.message = message;
		this.data = data;
		this.success = statuscode < 400;
	}
}
export {ApiResponse}