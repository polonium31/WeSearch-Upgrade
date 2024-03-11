import { asyncHandler } from "../middlewares/asyncHandler.js";
import { ApiError } from "../errors/ApiError.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import { Participant } from "../models/participant.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerParticipant = asyncHandler(async (req, res) => {});
const loginParticipant = asyncHandler(async (req, res) => {});
const logoutParticipant = asyncHandler(async (req, res) => {});
const refreshToken = asyncHandler(async (req, res) => {});
const forgotPassword = asyncHandler(async (req, res) => {});
const getProfile = asyncHandler(async (req, res) => {});
const updateProfile = asyncHandler(async (req, res) => {});
const updateParticipantAvatar = asyncHandler(async (req, res) => {});
const deleteProfile = asyncHandler(async (req, res) => {});
const changePassword = asyncHandler(async (req, res) => {});
const events = asyncHandler(async (req, res) => {});
const eventDetails = asyncHandler(async (req, res) => {});
const registerEvent = asyncHandler(async (req, res) => {});
const unregisterEvent = asyncHandler(async (req, res) => {});

export {
  registerParticipant,
  loginParticipant,
  logoutParticipant,
  refreshToken,
  forgotPassword,
  getProfile,
  updateProfile,
  updateParticipantAvatar,
  deleteProfile,
  changePassword,
  events,
  eventDetails,
  registerEvent,
  unregisterEvent,
};
