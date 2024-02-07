const express = require("express");
const cors = require("cors");
const app = express();
const { log } = console;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {});

app.post("/signup", async (req, res) => {});

app.post("/signout", async (req, res) => {});

app.patch("/forgot-password", async (req, res) => {});

app.delete("/delete-user", async (req, res) => {});

// -------------------  User's API  -------------------

// get first 10 events
app.get("/event", (req, res) => {});

// get all events
app.get("/events", (req, res) => {});

// get event details
app.get("/event-details/:eventId", (req, res) => {});

// search by filters
app.get("/search", (req, res) => {});

// store user details
app.post("/user-details", (req, res) => {});

// register to event
app.post("/register-to-event", (req, res) => {});

// edit user details
app.patch("/edit-user-details", async (req, res) => {});

// unregister to event
app.delete("/unregister-to-event", (req, res) => {});

// -------------------  Researcher's API  -------------------

// get all active events created by the researcher
app.get("/active-research-event", (req, res) => {});

// get all past events created by the researcher
app.get("/past-research-event", (req, res) => {});

// get all active events created by the researcher
app.get("/participants-details", (req, res) => {});

// create new event
app.post("/research-event-details", (req, res) => {
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
app.post("/close-event", (req, res) => {});

// add researcher details
app.post("/researcher-details", (req, res) => {});

// edit researcher details
app.patch("/edit-researcher-details", (req, res) => {});

// edit event details
app.patch("/edit-research-event-details", (req, res) => {});

// delete event
app.delete("/delete-event", (req, res) => {});

const port = 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
