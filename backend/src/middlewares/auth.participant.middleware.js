// utils/authMiddleware.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Participant } from "../models/user.model.js";
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await Participant.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access");
  }
});
