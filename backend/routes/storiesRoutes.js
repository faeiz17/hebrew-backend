import express from "express";
import { createStory, getStoriesByLevel } from "../controllers/storiesController.js"; // Ensure .js extension

const router = express.Router();

router.post("/", createStory);
router.get("/:level", getStoriesByLevel);

// ✅ Use `export default` instead of `module.exports`
export default router;
