import mongoose, { Schema } from "mongoose";

const participantSchema = new Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    currectStatus: {
      type: String,
      required: true,
      enum: ["undergraduate", "graduate", "phd"],
    },
    programName: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    race: {
      type: String,
    },
    income: {
      type: Number,
    },
    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
    },
    activeEvents: {
      type: Schema.Types.ObjectId,
      ref: "activeEvents",
    },
    pastEvents: {
      type: Schema.Types.ObjectId,
      ref: "pastEvents",
    },
    interests: {
      type: Array,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
participantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

participantSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
participantSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      id: this._id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

participantSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export default Participant = mongoose.modal("Participant", participantSchema);
