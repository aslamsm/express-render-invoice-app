import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, unique: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: Number,
        lineTotal: Number,
      },
    ],
    subtotal: Number,
    discountType: { type: String, enum: ["percent", "flat"] },
    discountValue: Number,
    discountAmount: Number,
    taxableAmount: Number,
    gstAmount: Number,
    roundingDiff: { type: Number, default: 0 },
    total: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Invoice", invoiceSchema);
