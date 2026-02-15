import express from "express";
import {
  createStory,
  getAllStories,
  getStoriesByLevel,
  getStoryById,
  updateStory,
  deleteStory,
} from "../controllers/story.controller.js";
import { protect, role } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllStories);
router.get("/level/:level", getStoriesByLevel);
router.get("/:id", getStoryById);

// Protected Admin Routes
router.use(protect, role("admin"));

router.post("/", createStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);

export default router;
