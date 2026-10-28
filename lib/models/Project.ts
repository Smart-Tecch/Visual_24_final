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
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, // Film, Photography, Web Design, Music, etc.
    },
    coverImage: {
      type: String,
    },
    media: [
      {
        type: String, // array of image/video urls
      },
    ],
    studentName: {
      type: String,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
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
