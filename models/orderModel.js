import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    products: [
      {
        prodctId: { type: String, required: true, uniqued: true },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    order: { type: Number, required: true },
    address: { type: Object, required: true },
    status: {type: String, default: 'pending'}
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
