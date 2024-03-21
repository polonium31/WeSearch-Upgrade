import nodemailer from "nodemailer";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";
import { Participant, Researcher } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const sendEmail = asyncHandler(
  async ({ email, emailType, userId, userType }) => {
    try {
      const hashedToken = await bcrypt.hash(userId.toString(), 10);

      if (emailType === "verify" && userType === "participant") {
        await Participant.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
      } else if (emailType === "reset" && userType === "participant") {
        await Participant.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
      } else if (emailType === "verify" && userType === "researcher") {
        await Researcher.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
      } else if (emailType === "reset" && userType === "researcher") {
        await Researcher.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
      }

      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });
      const verifyEmailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Email Verification</h2>
      <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the link below:</p>
      <p style="margin-bottom: 20px;"><a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}" style="display: inline-block; padding: 10px 20px; background-color: #FFD000; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
      <p>If you are unable to click the button above, you can also copy and paste the following link into your browser's address bar:</p>
      <p>${process.env.DOMAIN}/verify-email?token=${hashedToken}</p>
      <p>Thank you!</p>
    </div>`;

      const resetEmailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
      <h2>Password Reset</h2>
      <p>We received a request to reset your password. If you did not make this request, you can safely ignore this email.</p>
      <p>To reset your password, please click the link below:</p>
      <p style="margin-bottom: 20px;"><a href="${process.env.DOMAIN}/reset-email?token=${hashedToken}" style="display: inline-block; padding: 10px 20px; background-color: #FFA200; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>If you are unable to click the button above, you can also copy and paste the following link into your browser's address bar:</p>
      <p>${process.env.DOMAIN}/reset-email?token=${hashedToken}</p>
      <p>Thank you!</p>
    </div>`;
      const mailOptions = {
        from: "admin@wesearch.com",
        to: email,
        subject:
          emailType === "verify"
            ? "Verify your email - WeSearch"
            : "Reset your password - WeSearch",
        html: emailType === "verify" ? verifyEmailContent : resetEmailContent,
      };

      const mailResponse = await transporter.sendMail(mailOptions);
      if (mailResponse) {
        return mailResponse;
      }
    } catch (error) {
      console.log(error.message);
      throw new ApiError(500, error.message);
    }
  }
);
