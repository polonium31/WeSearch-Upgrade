import { Router } from "express";
import {
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
} from "../controllers/participant.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register-participant").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerParticipant
);
router.route("/login-participant").post(loginParticipant);
router.route("/logout-participant").post(logoutParticipant);
router.route("/refresh-token-participant").post(refreshToken);
router.route("/forgot-password-participant").post(forgotPassword);

// secure routes
router.route("/profile-participant").get(verifyJWT, getProfile);
router
  .route("/update-avatar-participant")
  .patch(
    verifyJWT,
    upload.single("avatar-participant"),
    updateParticipantAvatar
  );
router.route("/update-participant").patch(verifyJWT, updateProfile);
router.route("/delete-participant").delete(verifyJWT, deleteProfile);
router.route("/change-password-participant").patch(verifyJWT, changePassword);
router.route("/events").get(verifyJWT, events);
router.route("/event/:id").get(verifyJWT, eventDetails);
router.route("/event/:id/register").post(verifyJWT, registerEvent);
router.route("/event/:id/unregister").post(verifyJWT, unregisterEvent);

export default router;
