import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    custname: { type: String, required: true },
    address: String,
    city: String,
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
