import { PropertyFormData } from "@/types/PropertyFormData";
import mongoose, { Schema } from "mongoose";

const PropertySchema = new Schema<PropertyFormData>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    listingType: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
      index: true,
    },

    propertyType: {
      type: String,
      enum: ["apartment", "house", "villa", "plot", "commercial", "office"],
      required: true,
    },

    price: {
      type: String,
      required: true,
      min: 0,
    },

    priceUnit: {
      type: String,
      enum: ["total", "monthly"],
      required: true,
    },

    address: {
      street: { type: String },
      locality: { type: String, required: true },
      city: { type: String, required: true, index: true },
      state: { type: String, required: true },
      pincode: { type: String },
    },

    specifications: {
      bedrooms: { type: Number, default: 0 },
      bathrooms: { type: Number, default: 0 },
      area: { type: Number, required: true, min: 0 },
      parking: { type: Number, min: 0, default: 0 },
      areaUnit: {
        type: String,
        enum: ["sqft", "sqm", "sqyd"],
        default: "sqft",
      },
      furnishing: {
        type: String,
        enum: ["unfurnished", "semi-furnished", "furnished"],
        default: "unfurnished",
      },
    },

    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        alt: { type: String },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published", "sold", "rented", "archived"],
      default: "draft",
      index: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    publishedAt: { type: String },
  },
  { timestamps: true },
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
