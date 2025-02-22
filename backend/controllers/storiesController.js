import Story from "../models/storyModel.js"; // Ensure .js extension

// ✅ Create a new Story
export const createStory = async (req, res) => {
  try {
    const { hebrew, english, transliteration, level } = req.body;

    // Validate required fields
    if (!hebrew || !english || !transliteration || !level) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const story = new Story({ hebrew, english, transliteration, level });
    await story.save();

    res.status(201).json({ message: "Story created successfully!", story });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all stories
export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().lean();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get stories by level
export const getStoriesByLevel = async (req, res) => {
  try {
    const { level } = req.params;

    if (!["easy", "medium", "hard"].includes(level)) {
      return res.status(400).json({ error: "Invalid level parameter" });
    }

    const stories = await Story.find({ level }).lean();

    if (stories.length === 0) {
      return res
        .status(404)
        .json({ message: "No stories found for this level." });
    }

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get a single story by ID
export const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id).lean();

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update a story
export const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { hebrew, english, transliteration, level } = req.body;

    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { hebrew, english, transliteration, level },
      { new: true, runValidators: true } // Return updated document and validate input
    );

    if (!updatedStory) {
      return res.status(404).json({ error: "Story not found" });
    }

    res
      .status(200)
      .json({ message: "Story updated successfully!", updatedStory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a story
export const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStory = await Story.findByIdAndDelete(id);

    if (!deletedStory) {
      return res.status(404).json({ error: "Story not found" });
    }

    res.status(200).json({ message: "Story deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
