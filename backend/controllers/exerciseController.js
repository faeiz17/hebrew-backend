import Exercise from "../models/exerciseModel.js"; // Ensure .js extension
import Story from "../models/storyModel.js"; // Ensure .js extension

// Create an Exercise
export const createExercise = async (req, res) => {
  try {
    const { storyId, question, options, level } = req.body;

    // Check if the story exists
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Ensure the exercise level matches the story level
    if (story.level !== level) {
      return res.status(400).json({ error: "Exercise level does not match story level" });
    }

    const exercise = new Exercise({
      storyId,
      question,
      options,
      level,
    });

    await exercise.save();
    res.status(201).json({ exercise, story });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get exercises by level
export const getExercisesByLevel = async (req, res) => {
  try {
    const { level } = req.params;
    const exercises = await Exercise.find({ level }).populate(
      "storyId",
      "hebrew english transliteration"
    );
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get exercises by story ID
export const getExercisesByStoryId = async (req, res) => {
  try {
    const { storyId } = req.params;
    const exercises = await Exercise.find({ storyId }).populate(
      "storyId",
      "hebrew english transliteration"
    );
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
