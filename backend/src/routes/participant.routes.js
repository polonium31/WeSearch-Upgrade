import { userRoutes } from "./user.routes.js";
import * as participantController from "../controllers/participant.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const participantRoutes = userRoutes("participant", participantController);

// Add participant-specific routes
participantRoutes.route("/events").get(verifyJWT, participantController.events);
participantRoutes
  .route("/event/:id")
  .get(verifyJWT, participantController.eventDetails);
participantRoutes
  .route("/event/:id/register")
  .post(verifyJWT, participantController.registerEvent);
participantRoutes
  .route("/event/:id/unregister")
  .post(verifyJWT, participantController.unregisterEvent);

export default participantRoutes;
