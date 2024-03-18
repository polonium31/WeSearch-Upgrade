import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import { sendEmail } from "../utils/sendEmail.js";
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

const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized");
  }
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!decodedToken) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const user = await Participant.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Unauthorized Access");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh Token is Expired or Used");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { newAccessToken, newRefreshToken } = createAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
        "Token Refreshed Successfully"
      )
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if ([oldPassword, newPassword].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await Participant.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "INVALID user credentials");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  const user = await Participant.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const otp = Math.floor(1000 + Math.random() * 9000);

  const otpExpier = new Date();
  otpExpier.setMinutes(otpExpier.getMinutes() + 1);
  const templateParams = {
    to_email: email,
    name: user.firstname,
    otp: otp,
  };
  const sendEmailResponse = await sendEmail("forgot-password", templateParams);
  if (!sendEmailResponse) {
    throw new ApiError(500, "Error while sending email");
  }
  user.otp = otp;
  user.otpExpier = otpExpier;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "OTP sent to your email"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if ([email, otp, newPassword].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await Participant.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (user.otp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  }
  if (user.otpExpier < new Date()) {
    throw new ApiError(400, "OTP Expired");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Reset Successfully"));
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await Participant.findById(req.user?._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, user, "User Profile"));
});

const updateProfile = asyncHandler(async (req, res) => {});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is Needed");
  }
  const avatarUrl = await uploadOnCloud(avatarLocalPath);
  if (!avatarUrl.url) {
    throw new ApiError(400, "Error while uploading");
  }
  const user = await Participant.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { avatar: avatarUrl.url },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Avatar Updated"));
});

const deleteProfile = asyncHandler(async (req, res) => {
  const user = await Participant.findByIdAndDelete(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, {}, "User Deleted"));
});

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
  resetPassword,
};
