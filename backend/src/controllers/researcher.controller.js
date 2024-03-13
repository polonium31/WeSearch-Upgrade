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
import { Researcher } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const activeEvents = asyncHandler(async (req, res) => {});
const pastEvents = asyncHandler(async (req, res) => {});
const eventDetails = asyncHandler(async (req, res) => {});
const createEvent = asyncHandler(async (req, res) => {});
const updateEvent = asyncHandler(async (req, res) => {});
const deleteEvent = asyncHandler(async (req, res) => {});

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
  activeEvents,
  pastEvents,
  eventDetails,
  createEvent,
  updateEvent,
  deleteEvent,
};
