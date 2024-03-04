require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { log } = console;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/login", async (req, res) => {});

app.post("/api/signup", async (req, res) => {});

app.post("/api/signout", async (req, res) => {});

app.patch("/api/forgot-password", async (req, res) => {});

app.delete("/api/delete-user", async (req, res) => {});

// -------------------  User's API  -------------------

// get first 10 events
app.get("/api/", (req, res) => {});

// get all events
app.get("/api/events", (req, res) => {});

// get event details
app.get("/api/event-details/:eventId", (req, res) => {});

// search by filters
app.get("/api/search", (req, res) => {});

// store user details
app.post("/api/user-details", (req, res) => {});

// register to event
app.post("/api/register-to-event", (req, res) => {});

// edit user details
app.patch("/api/edit-user-details", async (req, res) => {});

// unregister to event
app.delete("/api/unregister-to-event", (req, res) => {});

// -------------------  Researcher's API  -------------------

// get all active events created by the researcher
app.get("/api/active-research-event", (req, res) => {});

// get all past events created by the researcher
app.get("/api/past-research-event", (req, res) => {});

// get all active events created by the researcher
app.get("/api/participants-details", (req, res) => {});

// create new event
app.post("/api/research-event-details", (req, res) => {
  const {
    title,
    description,
    eligibility,
    perks,
    deadline,
    numberOfVolunteer,
    majorEligibility,
    date,
    time,
    location,
    type,
    attendance,
    researcherId,
  } = req.body;
});

// close event
app.post("/api/close-event", (req, res) => {});

// add researcher details
app.post("/api/researcher-details", (req, res) => {});

// edit researcher details
app.patch("/api/edit-researcher-details", (req, res) => {});

// edit event details
app.patch("/api/edit-research-event-details", (req, res) => {});

// delete event
app.delete("/api/delete-event", (req, res) => {});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
