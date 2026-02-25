import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    barcode: String,
    itemname: { type: String, required: true },
    brand: String,
    category: String,
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Item", itemSchema);
