const mongoose = require("mongoose");
const createSlug = require("../utils/createSlug");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ["YouTube", "Ads", "Reels", "Wedding", "Corporate", "Music Video"]
    },
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    videoUrl: {
      type: String,
      required: true,
      trim: true
    },
    thumbnailUrl: {
      type: String,
      required: true,
      trim: true
    },
    beforeVideoUrl: {
      type: String,
      trim: true,
      default: ""
    },
    afterVideoUrl: {
      type: String,
      trim: true,
      default: ""
    },
    toolsUsed: {
      type: [String],
      default: []
    },
    timeline: {
      type: String,
      default: ""
    },
    results: {
      type: String,
      default: ""
    },
    challenge: {
      type: String,
      default: ""
    },
    editProcess: {
      type: String,
      default: ""
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

projectSchema.pre("validate", function createProjectSlug(next) {
  if (!this.slug && this.title) {
    this.slug = createSlug(this.title);
  }

  if (this.slug) {
    this.slug = createSlug(this.slug);
  }

  next();
});

module.exports = mongoose.model("Project", projectSchema);
