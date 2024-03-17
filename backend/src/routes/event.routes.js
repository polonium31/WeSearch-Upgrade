// user.routes.js
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyParticipantJWT } from "../middlewares/auth.participant.middleware.js";
import { verifyResearcherJWT } from "../middlewares/auth.researcher.middleware.js";
import * as eventController from "../controllers/event.controller.js";

const router = Router();
router
  .route("/events")
  .get(verifyParticipantJWT || verifyResearcherJWT, eventController.events);
router
  .route("/event/:id")
  .get(
    verifyParticipantJWT || verifyResearcherJWT,
    eventController.eventDetails
  );
router
  .route("/event/:id/register")
  .post(verifyParticipantJWT, eventController.registerEvent);
router
  .route("/event/:id/unregister")
  .post(verifyParticipantJWT, eventController.unregisterEvent);
router
  .route("/past-events")
  .get(verifyResearcherJWT, eventController.pastEvents);
router
  .route("/create-event")
  .post(
    verifyResearcherJWT,
    upload.single("image"),
    eventController.createEvent
  );
router
  .route("/update-event/:id")
  .put(
    verifyResearcherJWT,
    upload.single("image"),
    eventController.updateEvent
  );

router
  .route("/delete-event/:id")
  .delete(verifyResearcherJWT, eventController.deleteEvent);
export default router;
