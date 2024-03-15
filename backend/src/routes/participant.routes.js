// user.routes.js
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.participant.middleware.js";
import * as participantController from "../controllers/participant.controller.js";

const router = Router();
router
  .route("/register")
  .post(upload.single("avatar"), participantController.registerUser);
router.route("/login").post(participantController.loginUser);
router.route("/logout").post(verifyJWT, participantController.logoutUser);
router
  .route("/refresh-token")
  .post(verifyJWT, participantController.refreshToken);
router
  .route("/forgot-password")
  .post(verifyJWT, participantController.forgotPassword);

// Participant-specific routes
router.route("/events").get(verifyJWT, participantController.participantevents);
router
  .route("/event/:id")
  .get(verifyJWT, participantController.participanteventDetails);
router
  .route("/event/:id/register")
  .post(verifyJWT, participantController.participantregisterEvent);
router
  .route("/event/:id/unregister")
  .post(verifyJWT, participantController.participantunregisterEvent);

// Secure routes
router.route("/profile").get(verifyJWT, participantController.getProfile);
router
  .route("/update-avatar")
  .patch(
    verifyJWT,
    upload.single("avatar"),
    participantController.updateUserAvatar
  );
router
  .route("/update-profile")
  .patch(verifyJWT, participantController.updateProfile);
router
  .route("/delete-profile")
  .delete(verifyJWT, participantController.deleteProfile);
router
  .route("/reset-password")
  .patch(verifyJWT, participantController.changePassword);

export default router;
