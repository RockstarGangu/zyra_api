import mongoose, { Schema, Model } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "Vendor",
    },
    productImages: [
      {
        type: String,
        required: true,
      },
    ],
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    productMaterial: {
      type: String,
      required: true,
    },
    productSize: {
      type: String,
      required: true,
    },
    productWeight: {
      type: String,
      required: true,
      match: /^\d{1,3}(,\d{3})*(\.\d+)?$/,
    },
    pricing: {
      basePrice: {
        type: Number,
        required: true,
      },
      discountedPrice: {
        type: Number,
        required: true,
      },
    },
    inStock: {
      type: Number,
      required: true,
      min: 0,
    },
    isReturnable: {
      type: Boolean,
      required: true,
    },
    ratings: {
      ratingCount: {
        type: Number,
        required: true,
        min: 0,
      },
      avgRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ productName: "text", productDescription: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
