import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import customerRoutes from "./routes/customers.js";
import itemRoutes from "./routes/items.js";
import invoiceRoutes from "./routes/invoices.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5000"] }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/customers", customerRoutes);
app.use("/items", itemRoutes);
app.use("/invoices", invoiceRoutes);

// Start Server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
