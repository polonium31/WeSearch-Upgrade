import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  getProfile,
  updateProfile,
  updateUserAvatar,
  deleteProfile,
  changePassword,
} from "./user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import { Participant } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const events = asyncHandler(async (req, res) => {});
const eventDetails = asyncHandler(async (req, res) => {});
const registerEvent = asyncHandler(async (req, res) => {});
const unregisterEvent = asyncHandler(async (req, res) => {});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  getProfile,
  updateProfile,
  updateUserAvatar,
  deleteProfile,
  changePassword,
  events,
  eventDetails,
  registerEvent,
  unregisterEvent,
};
