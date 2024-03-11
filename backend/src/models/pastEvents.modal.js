import mongoose, { Schema } from "mongoose";

const pastEventsSchema = new Schema({
  theme: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eligibility: {
    type: Array,
    required: true,
  },
  majorEligibility: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  perks: {
    type: Array,
    required: true,
  },
  participants: {
    type: Schema.Types.ObjectId,
    ref: "Participant",
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  attendance: {
    type: String,
    required: true,
    enum: ["virtual", "in-person", "survey"],
  },
  researcher: {
    type: Schema.Types.ObjectId,
    ref: "Researcher",
  },
});

export default pastEvents = mongoose.model("pastEvents", pastEventsSchema);
