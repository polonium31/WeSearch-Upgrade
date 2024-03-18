import emailjs from "@emailjs/nodejs";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./ApiError.js";

const sendEmail = asyncHandler(async (YOUR_TEMPLATE_ID, templateParams) => {
  emailjs
    .send("", YOUR_TEMPLATE_ID, templateParams, {
      publicKey: "",
      privateKey: "",
    })
    .then(
      () => {
        return true;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
});

export { sendEmail };
