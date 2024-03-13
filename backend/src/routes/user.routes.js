// user.routes.js
import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

export const userRoutes = (userType, controller) => {
  const router = Router();

  router
    .route(`/register-${userType}`)
    .post(upload.single("avatar"), controller.registerUser);
  router.route(`/login-${userType}`).post(controller.loginUser);
  router.route(`/logout-${userType}`).post(controller.logoutUser);
  router.route(`/refresh-token-${userType}`).post(controller.refreshToken);
  router.route(`/forgot-password-${userType}`).post(controller.forgotPassword);

  // secure routes
  router.route(`/profile-${userType}`).get(verifyJWT, controller.getProfile);
  router
    .route(`/update-avatar-${userType}`)
    .patch(
      verifyJWT,
      upload.single(`avatar-${userType}`),
      controller.updateUserAvatar
    );
  router
    .route(`/update-${userType}`)
    .patch(verifyJWT, controller.updateProfile);
  router
    .route(`/delete-${userType}`)
    .delete(verifyJWT, controller.deleteProfile);
  router
    .route(`/change-password-${userType}`)
    .patch(verifyJWT, controller.changePassword);

  return router;
};
