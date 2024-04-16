import { ApiResponse } from "./apiResponse.js";

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode, error.data || {}, error.message));
    console.log("Runtime Error handlerd by asycnHanlder:", error); //enable for runtime error
  }
};

export { asyncHandler };
