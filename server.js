import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import customerRoutes from "./routes/customers.js";
import itemRoutes from "./routes/Items.js";
import invoiceRoutes from "./routes/invoices.js";

dotenv.config();
const app = express();

app.use(express.json());
// local host port : 5173... render port : 3000... server port : 5000
app.use(
  cors({
    origin: [
      "https://express-render-invoice-app.onrender.com",
      "http://localhost:5000",
    ],
  }),
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// =======================
// MongoDB Connection
// =======================

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
