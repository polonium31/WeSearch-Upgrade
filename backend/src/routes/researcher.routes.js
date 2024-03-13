import { userRoutes } from "./user.routes.js";
import * as researcherController from "../controllers/researcher.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const researcherRoutes = userRoutes("researcher", researcherController);

// Add researcher-specific routes
researcherRoutes
  .route("/active-events")
  .get(verifyJWT, researcherController.activeEvents);
researcherRoutes
  .route("/past-events")
  .get(verifyJWT, researcherController.pastEvents);
researcherRoutes
  .route("/event/:id")
  .get(verifyJWT, researcherController.eventDetails);
researcherRoutes
  .route("/create-event")
  .post(verifyJWT, researcherController.createEvent);
researcherRoutes
  .route("/update-event/:id")
  .patch(verifyJWT, researcherController.updateEvent);
researcherRoutes
  .route("/delete-event/:id")
  .delete(verifyJWT, researcherController.deleteEvent);

export default researcherRoutes;
