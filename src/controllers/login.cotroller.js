import { User } from "../models/user.model.js";
import { createToken } from "../utils/authentication.js";
import { VerifyHashedPassword } from "../utils/hashing.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(402, "Provide all credentials !!");
  }
  let user = {};
  // retrieving only necessary info
  try {
    user = await User.findOne(
      { email: email },
      { email: 1, collegeName: 1, password: 1 }
    );
  } catch (error) {
    throw new ApiError(500, "Error occured when querying db", error);
  }

  if (!user || !(await VerifyHashedPassword(password, user.password))) {
    throw new ApiError(401, "Invalid  credentials");
  }

  const token = createToken(user);
  user.password = undefined; // hiding the password
  res
    .status(200)
    .cookie("accessToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ! Expires in 7 Days
      httpOnly: true,
      secure: true,
    })
    .json(new ApiResponse(200, user, "Logged in successfully", token)); // remove token in production
});

export { handleLogin };
