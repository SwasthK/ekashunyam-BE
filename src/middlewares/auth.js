import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/authentication.js";

const auth = asyncHandler((req, res, next) => {
  const token = req.cookies.accessToken; // might  change depending on situation
  const decoded = verifyToken(token);
  if (!decoded) throw new ApiError(401, "unauthorised request");
  req.user = decoded.id;
  next();
});

export { auth };
