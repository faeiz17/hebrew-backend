import { Request, Response } from "express";
import { storyService } from "../services/story.service.js";
import { IStory } from "../models/index.js";

/**
 * @desc    Create a new Story
 * @route   POST /api/stories
 * @access  Private/Admin
 */
export const createStory = async (req: Request, res: Response) => {
  try {
    const { titleHebrew, titleEnglish, contentHebrew, contentEnglish, transliteration, level } = req.body;

    if (!titleHebrew || !titleEnglish || !contentHebrew || !contentEnglish || !level) {
      return res.status(400).json({ error: "All fields except transliteration are required." });
    }

    const story = await storyService.createStory({ titleHebrew, titleEnglish, contentHebrew, contentEnglish, transliteration, level });
    res.status(201).json({ message: "Story created successfully!", story });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Get all stories
 * @route   GET /api/stories
 * @access  Public
 */
export const getAllStories = async (_req: Request, res: Response) => {
  try {
    const stories = await storyService.getAllStories();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Get stories by level
 * @route   GET /api/stories/level/:level
 * @access  Public
 */
export const getStoriesByLevel = async (req: Request, res: Response) => {
  try {
    const { level } = req.params;

    if (!["easy", "medium", "hard"].includes(level as string)) {
      return res.status(400).json({ error: "Invalid level parameter" });
    }

    const stories = await storyService.getStoriesByLevel(level as string);

    if (stories.length === 0) {
      return res.status(404).json({ message: "No stories found for this level." });
    }

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Get a single story by ID
 * @route   GET /api/stories/:id
 * @access  Public
 */
export const getStoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const story = await storyService.getStoryById(id as string);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Update a story
 * @route   PUT /api/stories/:id
 * @access  Private/Admin
 */
export const updateStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedStory = await storyService.updateStory(id as string, req.body as Partial<IStory>);

    if (!updatedStory) {
      return res.status(404).json({ error: "Story not found" });
    }

    res.status(200).json({ message: "Story updated successfully!", updatedStory });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * @desc    Delete a story
 * @route   DELETE /api/stories/:id
 * @access  Private/Admin
 */
export const deleteStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await storyService.deleteStory(id as string);

    if (!success) {
      return res.status(404).json({ error: "Story not found" });
    }

    res.status(200).json({ message: "Story deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
