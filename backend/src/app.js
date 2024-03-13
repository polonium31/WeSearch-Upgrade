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
import participantRoutes from "./routes/participant.routes.js";
app.use("/api/v1/participant", participantRoutes);

// routes researcher
import researcherRoutes from "./routes/researcher.routes.js";
app.use("/api/v1/researcher", researcherRoutes);

export { app };
