import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const logOut = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken", {
      maxAge: -1,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json(new ApiResponse(200, "Logged out successfully"));
});

export { logOut };
