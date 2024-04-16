class ApiResponse {
  constructor(statusCode, data, message = "success", token = null) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.token = token; //optional
  }
}

export { ApiResponse };
