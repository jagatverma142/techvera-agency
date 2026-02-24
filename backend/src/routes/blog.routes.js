import express from "express";
import BlogPost from "../models/BlogPost.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await BlogPost.find({ status: "published" }).sort({ publishedAt: -1 });
  res.json(posts);
});

router.get("/:slug", async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, status: "published" });
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
});

router.post("/", requireAuth, async (req, res) => {
  const body = req.body || {};
  const created = await BlogPost.create({
    ...body,
    publishedAt: body.status === "published" ? new Date() : null
  });
  res.status(201).json(created);
});

export default router;
