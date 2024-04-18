import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/authentication.js";
import { User } from "../models/user.model.js";
const handleVerifyToken = asyncHandler(async (req, res) => {
  let token = req.cookies.accessToken;
  console.log(req.cookies);
  const isTokenValid = verifyToken(token);

  //sending user data to client
  if (isTokenValid) {
    try {
      const data = await User.findOne(
        { _id: isTokenValid.id },
        { email: 1, collegeName: 1, registration: 1 }
      );
      res.status(200).json(new ApiResponse(200, data, "Token is valid")); // might remove token
    } catch (err) {
      console.log(err);
      throw new ApiError(
        500,
        "server error occured during validation of token",
        err.message
      );
    }
  }
});

export { handleVerifyToken };
