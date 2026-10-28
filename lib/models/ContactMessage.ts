import mongoose, { Schema, models } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    courseInterest: {
      type: String,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

const ContactMessage =
  models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);

export default ContactMessage;
