import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import customerRoutes from "./routes/customers.js";
import itemRoutes from "./routes/Items.js";
import invoiceRoutes from "./routes/invoices.js";

dotenv.config();
const app = express();

// =======================
// Middleware
// =======================

app.use(express.json());

// ✅ CORS Configuration (Production + Local)
app.use(
  cors({
    origin: [
      "https://express-render-frontend.vercel.app", // ✅ Vercel frontend
      "http://localhost:5173", // ✅ Local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// =======================
// MongoDB Connection
// =======================

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =======================
// API Routes
// =======================

app.use("/customers", customerRoutes);
app.use("/items", itemRoutes);
app.use("/invoices", invoiceRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ API is running on Render");
});

// =======================
// Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
