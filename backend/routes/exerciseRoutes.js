import express from "express";
import { createExercise, getExercisesByLevel, getExercisesByStoryId } from "../controllers/exerciseController.js"; // Ensure .js extension

const router = express.Router();

router.post("/", createExercise);
router.get("/:level", getExercisesByLevel);
router.get("/story/:storyId", getExercisesByStoryId);

// ✅ Use `export default` instead of `module.exports`
export default router;
