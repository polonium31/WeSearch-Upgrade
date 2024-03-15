import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Participant } from "../models/user.model.js";

const createAccessAndRefreshToken = async (userID) => {
  try {
    const user = await Participant.findById(userID);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while creating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, currectStatus, programName } =
    req.body;
  if (
    [firstname, lastname, email, password, currectStatus, programName].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const userExist = await Participant.findOne({ email: email });
  if (userExist) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is Needed");
  }
  const avatarUrl = await uploadOnCloud(avatarLocalPath);
  if (!avatarUrl.url) {
    throw new ApiError(400, "Error while uploading");
  }
  const user = await Participant.create({
    avatar: avatarUrl.url,
    firstname: firstname.toLowerCase(),
    lastname: lastname.toLowerCase(),
    email: email,
    password: password,
    currectStatus: currectStatus,
    programName: programName,
  });
  const userCreated = await Participant.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while creating a user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, userCreated, "User created Successfully"));
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await Participant.findOne({ email: email });
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "INVALID user credentials");
  }

  const { accessToken, refreshToken } = await createAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  const loggedUser = await Participant.findById(user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accessToken,
          refreshToken,
        },
        "User Logged Successfully"
      )
    );
});
const logoutUser = asyncHandler(async (req, res) => {
  await Participant.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});
const refreshToken = asyncHandler(async (req, res) => {});
const forgotPassword = asyncHandler(async (req, res) => {});
const getProfile = asyncHandler(async (req, res) => {});
const updateProfile = asyncHandler(async (req, res) => {});
const updateUserAvatar = asyncHandler(async (req, res) => {});
const deleteProfile = asyncHandler(async (req, res) => {});
const changePassword = asyncHandler(async (req, res) => {});
const events = asyncHandler(async (req, res) => {});
const eventDetails = asyncHandler(async (req, res) => {});
const registerEvent = asyncHandler(async (req, res) => {});
const unregisterEvent = asyncHandler(async (req, res) => {});
const participantevents = asyncHandler(async (req, res) => {});
const participanteventDetails = asyncHandler(async (req, res) => {});
const participantregisterEvent = asyncHandler(async (req, res) => {});
const participantunregisterEvent = asyncHandler(async (req, res) => {});

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
  participantevents,
  participanteventDetails,
  participantregisterEvent,
  participantunregisterEvent,
};
