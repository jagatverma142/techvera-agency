import express from "express";
import { z } from "zod";
import Lead from "../models/Lead.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  service: z.string().optional().default(""),
  budget: z.string().optional().default(""),
  message: z.string().optional().default("")
});

router.post("/", async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid data", errors: parsed.error.issues });

  const lead = await Lead.create(parsed.data);
  res.status(201).json({ message: "Lead created", leadId: lead._id });
});

router.get("/", requireAuth, async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(200);
  res.json(leads);
});

router.patch("/:id/status", requireAuth, async (req, res) => {
  const { status } = req.body || {};
  const updated = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});

export default router;
