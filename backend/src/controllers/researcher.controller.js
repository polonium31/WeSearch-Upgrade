import { asyncHandler } from "../middlewares/asyncHandler.js";
import { ApiError } from "../errors/ApiError.js";
import { ApiResponse } from "../helpers/ApiResponse.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import { Participant } from "../models/participant.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerResearcher = asyncHandler(async (req, res) => {});
const loginResearcher = asyncHandler(async (req, res) => {});
const logoutResearcher = asyncHandler(async (req, res) => {});
const refreshToken = asyncHandler(async (req, res) => {});
const forgotPassword = asyncHandler(async (req, res) => {});
const getProfile = asyncHandler(async (req, res) => {});
const updateProfile = asyncHandler(async (req, res) => {});
const updateResearcherAvatar = asyncHandler(async (req, res) => {});
const deleteProfile = asyncHandler(async (req, res) => {});
const changePassword = asyncHandler(async (req, res) => {});
const activeEvents = asyncHandler(async (req, res) => {});
const pastEvents = asyncHandler(async (req, res) => {});
const eventDetails = asyncHandler(async (req, res) => {});
const createEvent = asyncHandler(async (req, res) => {});
const updateEvent = asyncHandler(async (req, res) => {});
const deleteEvent = asyncHandler(async (req, res) => {});

export {
  registerResearcher,
  loginResearcher,
  logoutResearcher,
  refreshToken,
  forgotPassword,
  getProfile,
  updateProfile,
  updateResearcherAvatar,
  deleteProfile,
  changePassword,
  activeEvents,
  pastEvents,
  eventDetails,
  createEvent,
  updateEvent,
  deleteEvent,
};
