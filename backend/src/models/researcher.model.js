import mongoose, { Schema } from "mongoose";

const researcherSchema = new Schema(
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
      required: [true, "Password is required"],
    },

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
  },
  { timestamps: true }
);

researcherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

researcherSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

researcherSchema.methods.generateAccessToken = async function () {
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

researcherSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export default Researcher = mongoose.modal("Researcher", researcherSchema);
