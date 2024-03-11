import { Router } from "express";
import {
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
} from "../controllers/researcher.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register-researcher").post(registerResearcher);
router.route("/login-researcher").post(loginResearcher);
router.route("/logout-researcher").post(logoutResearcher);
router.route("/refresh-token-researcher").post(refreshToken);
router.route("/forgot-password-researcher").post(forgotPassword);

// secure routes
router.route("/profile-researcher").get(verifyJWT, getProfile);
router
  .route("/update-avatar-researcher")
  .patch(verifyJWT, upload.single("avatar-researcher"), updateResearcherAvatar);
router.route("/update-researcher").patch(verifyJWT, updateProfile);
router.route("/delete-researcher").delete(verifyJWT, deleteProfile);
router.route("/change-password-researcher").patch(verifyJWT, changePassword);
router.route("/active-events").get(verifyJWT, activeEvents);
router.route("/past-events").get(verifyJWT, pastEvents);
router.route("/event/:id").get(verifyJWT, eventDetails);
router.route("/create-event").post(verifyJWT, createEvent);
router.route("/update-event/:id").patch(verifyJWT, updateEvent);
router.route("/delete-event/:id").delete(verifyJWT, deleteEvent);

export default router;
