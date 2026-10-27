import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // Film, Photography, Web, etc.
    coverImage: { type: String },
    media: [{ type: String }], // array of images/videos
    studentName: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Project = models.Project || mongoose.model("Project", ProjectSchema);

export default Project;
