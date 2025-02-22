import express from "express";
import {
  createStory,
  getAllStories,
  getStoriesByLevel,
  getStoryById,
  updateStory,
  deleteStory,
} from "../controllers/storiesController.js";

const router = express.Router();

// Routes
router.post("/", createStory);
router.get("/", getAllStories);
router.get("/level/:level", getStoriesByLevel);
router.get("/:id", getStoryById);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);

export default router;
