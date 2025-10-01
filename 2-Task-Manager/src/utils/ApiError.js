class ApiError extends Error{
	constructor(
		statusCode,
		message,
		errors = [],
		stack = ""
	){
		this.statusCode = statusCode;
		super(message);
		this.message = message;
		this.errors = errors;
		this.data = null;
		this.success = false;

		if(stack){
			this.stack = stack;
		} else{
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
export {ApiError}