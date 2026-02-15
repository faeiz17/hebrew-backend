import { Request, Response } from "express";
import { exerciseService } from "../services/exercise.service.js";
import { IExercise } from "../models/index.js";

/**
 * @desc    Create an Exercise
 * @route   POST /api/exercises
 * @access  Private/Admin
 */
export const createExercise = async (req: Request, res: Response) => {
  try {
    const { storyId, question, options, level } = req.body;

    if (!storyId || !question || !options || !level) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const exercise = await exerciseService.createExercise({ storyId, question, options, level });
    res.status(201).json({ message: "Exercise created successfully!", exercise });
  } catch (error) {
    const message = (error as Error).message;
    res.status(message === "Story not found" ? 404 : 400).json({ error: message });
  }
};

/**
 * @desc    Get all exercises
 * @route   GET /api/exercises
 * @access  Public
 */
export const getAllExercises = async (_req: Request, res: Response) => {
  try {
    const exercises = await exerciseService.getAllExercises();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Get exercises by level
 * @route   GET /api/exercises/level/:level
 * @access  Public
 */
export const getExercisesByLevel = async (req: Request, res: Response) => {
  try {
    const { level } = req.params;

    if (!["easy", "medium", "hard"].includes(level as string)) {
      return res.status(400).json({ error: "Invalid level parameter" });
    }

    const exercises = await exerciseService.getExercisesByLevel(level as string);

    if (exercises.length === 0) {
      return res.status(404).json({ message: "No exercises found for this level." });
    }

    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Get exercises by story ID
 * @route   GET /api/exercises/story/:storyId
 * @access  Public
 */
export const getExercisesByStoryId = async (req: Request, res: Response) => {
  try {
    const { storyId } = req.params;
    const exercises = await exerciseService.getExercisesByStoryId(storyId as string);

    if (exercises.length === 0) {
      return res.status(404).json({ message: "No exercises found for this story." });
    }

    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Get a single exercise by ID
 * @route   GET /api/exercises/:id
 * @access  Public
 */
export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await exerciseService.getExerciseById(id as string);

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Update an exercise
 * @route   PUT /api/exercises/:id
 * @access  Private/Admin
 */
export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedExercise = await exerciseService.updateExercise(id as string, req.body as Partial<IExercise>);

    if (!updatedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(200).json({ message: "Exercise updated successfully!", updatedExercise });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Delete an exercise
 * @route   DELETE /api/exercises/:id
 * @access  Private/Admin
 */
export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await exerciseService.deleteExercise(id as string);

    if (!success) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(200).json({ message: "Exercise deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
