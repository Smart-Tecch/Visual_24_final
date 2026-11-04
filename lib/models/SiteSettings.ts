import mongoose, { Schema, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "default",
    },
    school: {
      type: Schema.Types.Mixed,
      required: true,
    },
    categories: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    pages: {
      type: Schema.Types.Mixed,
      required: true,
    },
    seo: {
      type: Schema.Types.Mixed,
      required: true,
    },
    showFees: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const SiteSettings =
  models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
