import { PropertyFormData } from "@/types/PropertyFormData";
import mongoose, { Schema } from "mongoose";

const PropertySchema = new Schema<PropertyFormData>(
  {
    title: {
      required: true,
      trim: true,
      maxlenght: 150,
    },

    slug: {
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      required: true,
    },

    listingType: {
      enum: ["sale", "rent"],
      required: true,
      index: true,
    },

    propertyType: {
      enum: ["apartment", "house", "villa", "plot", "commercial", "office"],
      required: true,
    },

    price: {
      required: true,
      min: 0,
    },

    priceUnit: {
      enum: ["total", "monthly"],
      required: true,
    },

    address: {
      street: String,
      locality: { required: true },
      city: { required: true, index: true },
      state: { required: true },
      pincode: String,
    },

    specifications: {
      bedrooms: { default: 0 },
      bathrooms: { default: 0 },
      area: { required: true, min: 0 },
      parking: { min: 0, default: 0 },
      areaUnit: {
        enum: ["sqft", "sqm", "sqyd"],
        default: "sqft",
      },
      furnishing: {
        enum: ["unfurnished", "semi-furnished", "furnished"],
        default: "unfurnished",
      },
    },

    images: [
      {
        url: { required: true },
        publicId: { required: true },
        alt: String,
      },
    ],

    status: {
      enum: ["draft", "published", "sold", "rented", "archived"],
      default: "draft",
      index: true,
    },

    featured: {
      default: false,
    },

    publishedAt: Date,
  },
  { timestamps: true },
);

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);

export default Property;
