import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
    },
    studentNames: {
      type: [String],
      default: [],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    published: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Project = models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
