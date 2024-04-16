import { User } from "../models/user.model.js";
import { createToken } from "../utils/authentication.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleRegistration = asyncHandler(async (req, res) => {
  const { email, password, collegeName } = req.body;
  if (!(email && password && collegeName)) {
    throw new ApiError(402, "Please provide all the credentials");
  }

  let isEmailAlreadyExist = {};
  try {
    isEmailAlreadyExist = await User.findOne({ email: email });
  } catch (error) {
    throw new ApiError(500, "duplicate email validation error", error);
  }

  if (isEmailAlreadyExist) {
    throw new ApiError(409, "Email already exist");
  }

  let user;
  try {
    const newUser = await User.create({
      email: email.toLowerCase().trim(),
      password: password.trim(),
      collegeName,
    });

    // retrieving only necessary information
    user = await User.findOne(
      { email: newUser.email },
      { email: 1, collegeName: 1 }
    );
    if (!user) throw new Error("Server Error occured during creation of user"); //throwing error incase user creation is unsuccessfull
  } catch (error) {
    throw new ApiError(500, "user creation error");
  }

  const token = createToken(user);
  res
    .status(201)
    .cookie("accessToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // !Expires in 7 Days
      httpOnly: true,
      // secure: true,     // ! turn on when https availble
    })
    .json(new ApiResponse(201, user, "Registraion complete", token)); // Remove token in production
});

export { handleRegistration };
