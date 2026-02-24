import express from "express";
import Service from "../models/Service.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Service.find({ isActive: true }).sort({ order: 1 });
  res.json(services);
});

router.post("/", requireAuth, async (req, res) => {
  const created = await Service.create(req.body);
  res.status(201).json(created);
});

export default router;
