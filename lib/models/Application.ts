import mongoose, { Schema, models } from "mongoose";

const ApplicationSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    dateOfBirth: { type: Date },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    intake: { type: Schema.Types.ObjectId, ref: "Intake" },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "enrolled", "declined"],
      default: "new",
    },
  },
  { timestamps: true },
);

const Application =
  models.Application || mongoose.model("Application", ApplicationSchema);

export default Application;
