// user.routes.js
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.researcher.middleware.js";
import * as researcherController from "../controllers/researcher.controller.js";

const router = Router();
router
  .route("/register")
  .post(upload.single("avatar"), researcherController.registerUser);
router.route("/login").post(researcherController.loginUser);

// Secure routes
router.route("/logout").post(verifyJWT, researcherController.logoutUser);
router
  .route("/refresh-token")
  .post(verifyJWT, researcherController.refreshToken);
router
  .route("/forgot-password")
  .post(verifyJWT, researcherController.forgotPassword);

router.route("/profile").get(verifyJWT, researcherController.getProfile);
router
  .route("/update-avatar")
  .put(
    verifyJWT,
    upload.single("avatar"),
    researcherController.updateUserAvatar
  );
router
  .route("/update-profile")
  .patch(verifyJWT, researcherController.updateProfile);
router
  .route("/delete-profile")
  .delete(verifyJWT, researcherController.deleteProfile);
router
  .route("/reset-password")
  .patch(verifyJWT, researcherController.changePassword);

export default router;
