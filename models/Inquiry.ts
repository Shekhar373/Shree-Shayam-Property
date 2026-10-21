// models/Inquiry.ts
import mongoose, { Schema } from "mongoose";

const InquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      maxlength: 3000,
    },

    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "interested", "closed", "spam"],
      default: "new",
      index: true,
    },

    notes: String,
    followUpAt: Date,
  },
  { timestamps: true }
);

InquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Inquiry ||
  mongoose.model("Inquiry", InquirySchema);