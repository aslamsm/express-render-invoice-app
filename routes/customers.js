import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

// ── CREATE  POST /customers ───────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({
          success: false,
          message: "A customer with this email already exists.",
        });
    }
    res.status(400).json({ success: false, message: error.message });
  }
});

// ── READ ALL  GET /customers ──────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const filter = {};

    if (status) filter["account.status"] = status;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { "contact.email": { $regex: search, $options: "i" } },
        { "contact.phone": { $regex: search, $options: "i" } },
      ];
    }

    const customers = await Customer.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Customer.countDocuments(filter);
    res.json({
      success: true,
      data: customers,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── READ ONE  GET /customers/:id ──────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).lean();
    if (!customer)
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── UPDATE  PUT /customers/:id ────────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    ).lean();
    if (!customer)
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    res.json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ── DELETE  DELETE /customers/:id ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer)
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    res.json({ success: true, message: "Customer deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
