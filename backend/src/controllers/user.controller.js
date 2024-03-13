import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {});
const loginUser = asyncHandler(async (req, res) => {});
const logoutUser = asyncHandler(async (req, res) => {});
const refreshToken = asyncHandler(async (req, res) => {});
const forgotPassword = asyncHandler(async (req, res) => {});
const getProfile = asyncHandler(async (req, res) => {});
const updateProfile = asyncHandler(async (req, res) => {});
const updateUserAvatar = asyncHandler(async (req, res) => {});
const deleteProfile = asyncHandler(async (req, res) => {});
const changePassword = asyncHandler(async (req, res) => {});

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
};
