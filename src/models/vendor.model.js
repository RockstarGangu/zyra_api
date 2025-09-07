import mongoose, { Schema, Model } from "mongoose";

const vendorSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    brandTagline: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
    },
    aboutBrand: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    links: [
      {
        name: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

//TODO : Add KYC and payment details

const Vendor = new Model("Vendor", vendorSchema);

export default Vendor;
