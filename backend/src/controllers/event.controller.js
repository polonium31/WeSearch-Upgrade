import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Participant, Researcher } from "../models/user.model.js";
import { Events } from "../models/event.modal.js";
const events = asyncHandler(async (req, res) => {});
const eventDetails = asyncHandler(async (req, res) => {});
const registerEvent = asyncHandler(async (req, res) => {});
const unregisterEvent = asyncHandler(async (req, res) => {});
const pastEvents = asyncHandler(async (req, res) => {});
const createEvent = asyncHandler(async (req, res) => {});
const updateEvent = asyncHandler(async (req, res) => {});
const deleteEvent = asyncHandler(async (req, res) => {});
export {
  events,
  eventDetails,
  registerEvent,
  unregisterEvent,
  pastEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
