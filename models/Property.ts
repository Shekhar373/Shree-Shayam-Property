import mongoose, { Schema } from "mongoose";

const PropertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlengh: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    discription: {
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
      type: Number,
      required: true,
      min: 0,
    },

    priceUnit: {
      type: String,
      enum: ["total", "monthly"],
      requried: true,
    },

    address: {
      street: String,
      locality: { type: String, required: true },
      city: { type: String, required: true, index: true },
      state: { type: String, required: true },
      pincode: String,
    },

    specifications: {
      bedrooms: { type: Number, default: 0 },
      bathrooms: { type: Number, default: 0 },
      area: { type: Number, required: true, min: 0 },
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
        alt: String,
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published", "sold", "rented", "archived"],
      default: "draft",
      index: true,
    },

    publishedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.models.Property ||
  mongoose.model("Property", PropertySchema);
