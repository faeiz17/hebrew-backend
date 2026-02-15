import express from "express";
import {
  createExercise,
  getAllExercises,
  getExercisesByLevel,
  getExercisesByStoryId,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../controllers/exercise.controller.js";
import { protect, role } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes (Optional: Some might be protected depending on business needs)
router.get("/", getAllExercises);
router.get("/level/:level", getExercisesByLevel);
router.get("/story/:storyId", getExercisesByStoryId);
router.get("/:id", getExerciseById);

// Protected Admin Routes
router.use(protect, role("admin"));

router.post("/", createExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;
