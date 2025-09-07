import mongoose, { Schema, Model } from "mongoose";

const reviewSchema = new Schema({
  images: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

const Review = new Model("Review", reviewSchema);

export default Review;
