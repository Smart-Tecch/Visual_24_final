import mongoose, { Schema, models } from "mongoose";

const IntakeSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    seats: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true },
);

const Intake = models.Intake || mongoose.model("Intake", IntakeSchema);

export default Intake;
