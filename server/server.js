import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
  }),
);

// =======================
// MongoDB Connection
// =======================

mongoose
  .connect(process.env.MONGO_URL || 5000)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// =======================
// SCHEMAS
// =======================

// ---------------- CUSTOMER ----------------

const customerSchema = new mongoose.Schema(
  {
    custname: { type: String, required: true },
    address: String,
    city: String,
  },
  { timestamps: true },
);

const Customer = mongoose.model("Customer", customerSchema);

// ---------------- ITEM ----------------

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

const Item = mongoose.model("Item", itemSchema);

// ---------------- INVOICE ----------------

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

    discountType: {
      type: String,
      enum: ["percent", "flat"],
    },

    discountValue: Number,
    discountAmount: Number,

    taxableAmount: Number,

    gstAmount: Number,
    roundingDiff: { type: Number, default: 0 },
    total: Number,
  },
  { timestamps: true },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

// =======================
// CUSTOMER ROUTES
// =======================

app.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find().lean();
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =======================
// ITEM ROUTES
// =======================

app.post("/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find().lean();
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// =======================
// INVOICE ROUTES
// =======================

// CREATE INVOICE (Matches CreateInvoice.tsx)
app.post("/invoices", async (req, res) => {
  try {
    const {
      invoiceNumber,
      customer,
      items,
      subtotal,
      discountType,
      discountValue,
      discountAmount,
      taxableAmount,
      roundingDiff,
      gst,
      total,
    } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice data",
      });
    }

    const enrichedItems = [];

    for (const line of items) {
      const itemData = await Item.findById(line.item);
      if (!itemData) {
        return res.status(400).json({
          success: false,
          message: "Item not found",
        });
      }

      const price = itemData.price;
      const lineTotal = price * line.quantity;

      enrichedItems.push({
        item: line.item,
        quantity: line.quantity,
        price,
        lineTotal,
      });
    }

    const invoice = new Invoice({
      invoiceNumber,
      customer,
      items: enrichedItems,
      subtotal,
      discountType,
      discountValue,
      discountAmount,
      taxableAmount,
      roundingDiff,
      gstAmount: gst,
      total,
    });

    await invoice.save();

    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate("customer")
      .populate("items.item");

    res.status(201).json({
      success: true,
      data: populatedInvoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL INVOICES
app.get("/invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer")
      .populate("items.item")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE INVOICE
app.delete("/invoices/:id", async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/invoices/next-number", async (req, res) => {
  const count = await Invoice.countDocuments();
  const yr =
    new Date().getMonth() >= 3
      ? new Date().getFullYear()
      : new Date().getFullYear() - 1;
  const fy = `${String(yr).slice(2)}${String(yr + 1).slice(2)}`;
  res.json({ nextNumber: `INV-${fy}-${String(count + 1).padStart(4, "0")}` });
});
// =======================
// START SERVER
// =======================

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
