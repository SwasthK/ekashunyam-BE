import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const logOut = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken", { maxAge: -1 })
    .json(new ApiResponse(200, "Logged out successfully"));
});

export { logOut };
