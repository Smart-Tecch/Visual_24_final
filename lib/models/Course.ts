import mongoose, { Schema, models } from "mongoose";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["technical", "creative", "business"],
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "coming-soon"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      required: true,
    },
    outline: {
      type: [String],
      default: [],
    },
    fee: {
      type: Number,
    },
    instructor: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Course = models.Course || mongoose.model("Course", CourseSchema);

export default Course;
