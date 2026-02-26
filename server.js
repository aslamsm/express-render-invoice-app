import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import customerRoutes from "./routes/customers.js";
import itemRoutes from "./routes/Items.js";
import invoiceRoutes from "./routes/invoices.js";

dotenv.config();
const app = express();

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: [
      "https://express-render-invoice-app.onrender.com",
      "http://localhost:5173",
      "http://localhost:5000",
    ],
  }),
);

// =======================
// MongoDB Connection
// =======================

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/customers", customerRoutes);
app.use("/items", itemRoutes);
app.use("/invoices", invoiceRoutes);

// =======================
// Serve React Frontend in Production
// =======================

// In production, serve the built React app
if (process.env.NODE_ENV === "production") {
  // Serve static files from the dist directory
  app.use(express.static(path.join(__dirname, "dist")));

  // For any route that doesn't match an API route, serve index.html
  app.get("*", (req, res) => {
    // Skip API routes
    if (
      req.path.startsWith("/customers") ||
      req.path.startsWith("/items") ||
      req.path.startsWith("/invoices")
    ) {
      return res.status(404).json({ error: "API endpoint not found" });
    }

    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  console.log("Production mode: Serving React app from dist folder");
} else {
  // Development mode
  app.get("/", (req, res) => {
    res.send("API is running. Frontend is in development mode on port 5173");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
