import express from "express";
import {
  createExercise,
  getAllExercises,
  getExercisesByLevel,
  getExercisesByStoryId,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseController.js";

const router = express.Router();

// Routes
router.post("/", createExercise);
router.get("/", getAllExercises);
router.get("/level/:level", getExercisesByLevel);
router.get("/story/:storyId", getExercisesByStoryId);
router.get("/:id", getExerciseById);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;
