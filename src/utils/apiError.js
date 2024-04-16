class ApiError extends Error {
  constructor(statusCode, message = "some thing went wrong", errors = []) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}

export { ApiError };
