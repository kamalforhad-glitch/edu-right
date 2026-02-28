import mongoose, { Schema, Document, Model } from "mongoose";

export type ContentType =
  | "news"
  | "event"
  | "gallery"
  | "research"
  | "advocacy"
  | "parliament"
  | "project";

export interface IContent extends Document {
  _id: mongoose.Types.ObjectId;
  type: ContentType;
  title: string;
  titleBn?: string;
  slug: string;
  description: string;
  descriptionBn?: string;
  content: string;
  contentBn?: string;
  featuredImage?: string;
  images?: string[];
  tags?: string[];
  category?: string;
  // Event-specific fields
  eventDate?: Date;
  eventEndDate?: Date;
  eventLocation?: string;
  eventLocationBn?: string;
  expectedAttendees?: number;
  // News-specific fields
  externalLink?: string;
  source?: string;
  publishDate?: Date;
  // Project-specific fields
  status?: "upcoming" | "ongoing" | "completed";
  // General
  isPublished: boolean;
  isFeatured: boolean;
  author: mongoose.Types.ObjectId;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "news",
        "event",
        "gallery",
        "research",
        "advocacy",
        "parliament",
        "project",
      ],
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    titleBn: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    descriptionBn: String,
    content: {
      type: String,
      default: "",
    },
    contentBn: String,
    featuredImage: String,
    images: [String],
    tags: [String],
    category: String,
    // Event
    eventDate: Date,
    eventEndDate: Date,
    eventLocation: String,
    eventLocationBn: String,
    expectedAttendees: Number,
    // News
    externalLink: String,
    source: String,
    publishDate: Date,
    // Project
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
    },
    // General
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Create compound index for type + published queries
ContentSchema.index({ type: 1, isPublished: 1, createdAt: -1 });
ContentSchema.index({ slug: 1 });

// Auto-generate slug from title
ContentSchema.pre("validate", function () {
  if (this.title && !this.slug) {
    this.slug =
      this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now();
  }
});

const Content: Model<IContent> =
  mongoose.models.Content || mongoose.model<IContent>("Content", ContentSchema);

export default Content;
