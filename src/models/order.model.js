import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  orderedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  orderedProducts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalPrice: {
    type: Number,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "UPI", "Card", "NetBanking"],
  },
  status: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  },
  orderAddress: {
    type: mongoose.Types.ObjectId,
    ref: "Address",
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
