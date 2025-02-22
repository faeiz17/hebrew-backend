import Exercise from "../models/exerciseModel.js"; // Ensure .js extension
import Story from "../models/storyModel.js"; // Ensure .js extension

// ✅ Create an Exercise
export const createExercise = async (req, res) => {
  try {
    const { storyId, question, options, level } = req.body;

    // Validate required fields
    if (!storyId || !question || !options || !level) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the story exists
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // Ensure the exercise level matches the story level
    if (story.level !== level) {
      return res
        .status(400)
        .json({ error: "Exercise level does not match story level" });
    }

    const exercise = new Exercise({ storyId, question, options, level });
    await exercise.save();

    res
      .status(201)
      .json({ message: "Exercise created successfully!", exercise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all exercises
export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find()
      .populate("storyId", "hebrew english transliteration")
      .lean();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get exercises by level
export const getExercisesByLevel = async (req, res) => {
  try {
    const { level } = req.params;

    if (!["easy", "medium", "hard"].includes(level)) {
      return res.status(400).json({ error: "Invalid level parameter" });
    }

    const exercises = await Exercise.find({ level })
      .populate("storyId", "hebrew english transliteration")
      .lean();

    if (exercises.length === 0) {
      return res
        .status(404)
        .json({ message: "No exercises found for this level." });
    }

    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get exercises by story ID
export const getExercisesByStoryId = async (req, res) => {
  try {
    const { storyId } = req.params;
    const exercises = await Exercise.find({ storyId })
      .populate("storyId", "hebrew english transliteration")
      .lean();

    if (exercises.length === 0) {
      return res
        .status(404)
        .json({ message: "No exercises found for this story." });
    }

    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a single exercise by ID
export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findById(id)
      .populate("storyId", "hebrew english transliteration")
      .lean();

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update an exercise
export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { storyId, question, options, level } = req.body;

    const updatedExercise = await Exercise.findByIdAndUpdate(
      id,
      { storyId, question, options, level },
      { new: true, runValidators: true } // Return updated document and validate input
    );

    if (!updatedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res
      .status(200)
      .json({ message: "Exercise updated successfully!", updatedExercise });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete an exercise
export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExercise = await Exercise.findByIdAndDelete(id);

    if (!deletedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.status(200).json({ message: "Exercise deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
