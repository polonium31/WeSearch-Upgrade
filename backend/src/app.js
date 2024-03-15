import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes participant
import participantRouter from "./routes/participant.routes.js";
app.use("/api/v1/participant", participantRouter);

// routes researcher
import researcherRouter from "./routes/researcher.routes.js";
app.use("/api/v1/researcher", researcherRouter);

export { app };
