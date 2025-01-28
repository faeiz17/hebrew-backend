import Story from "../models/storyModel.js"; // Ensure .js extension

// Create a Story
export const createStory = async (req, res) => {
  try {
    const { hebrew, english, transliteration, level } = req.body;
    const story = new Story({
      hebrew,
      english,
      transliteration,
      level,
    });

    await story.save();
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stories by level
export const getStoriesByLevel = async (req, res) => {
  console.log("Are you sure you want to");
  try {
    const { level } = req.params;
    const stories = await Story.find({ level });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
