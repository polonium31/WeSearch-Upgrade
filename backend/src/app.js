import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes participant
import { participantRouter } from "./routes/participant.route.js";
app.use("/api/v1/participant", participantRouter);

// routes researcher
import { researcherRouter } from "./routes/researcher.route.js";
app.use("/api/v1/researcher", researcherRouter);
export { app };
