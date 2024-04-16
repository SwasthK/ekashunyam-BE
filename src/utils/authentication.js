import jwt from "jsonwebtoken";
import { ApiError } from "./apiError.js";
const secretKey = process.env.ACCESS_TOKEN_SECRET || "for deocker only";

function createToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, secretKey, {
    expiresIn: "7d", //expires in 7 days
  });
}

function verifyToken(token) {
  if (!token) throw new ApiError(401, "Invalid token");
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
}

export { createToken, verifyToken };
