import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
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
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    activeEvents: {
      type: Schema.Types.ObjectId,
      ref: "activeEvents",
    },
    pastEvents: {
      type: Schema.Types.ObjectId,
      ref: "pastEvents",
    },
    refreshToken: {
      type: String,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
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

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const participantSchema = new Schema(
  {
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
    },
    location: {
      type: String,
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
    interests: {
      type: Array,
    },
  },
  { timestamps: true }
);

const researcherSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
      enum: ["assistant professor", "associate professor", "professor"],
    },
    departmentName: {
      type: String,
      required: true,
    },
    researchInterests: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Participant = mongoose.model(
  "Participant",
  userSchema.clone().add(participantSchema)
);
const Researcher = mongoose.model(
  "Researcher",
  userSchema.clone().add(researcherSchema)
);

export { Participant, Researcher };
