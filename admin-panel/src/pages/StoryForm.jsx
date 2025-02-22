// src/pages/StoryForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createStory, getStoryById, updateStory } from "../api/storyApi";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

const StoryForm = () => {
  // If "id" exists in URL, we’re editing an existing story; otherwise we’re creating a new one.
  const { id } = useParams();
  const navigate = useNavigate();

  // Local state to hold the story being created/edited
  const [story, setStory] = useState({
    hebrew: "",
    english: "",
    transliteration: "",
    level: "easy",
  });

  // If we're editing, fetch the existing story
  useEffect(() => {
    if (id) {
      fetchStory(id);
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchStory = async (storyId) => {
    try {
      const data = await getStoryById(storyId);
      setStory(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setStory({ ...story, [field]: value });
  };

  // On form submit: either create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateStory(id, story);
      } else {
        await createStory(story);
      }
      navigate("/stories"); // go back to the Stories list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Edit Story" : "Create New Story"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Hebrew"
          value={story.hebrew}
          onChange={(e) => handleChange("hebrew", e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="English"
          value={story.english}
          onChange={(e) => handleChange("english", e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Transliteration"
          value={story.transliteration}
          onChange={(e) => handleChange("transliteration", e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Level"
          value={story.level}
          onChange={(e) => handleChange("level", e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField>

        <Button type="submit" variant="contained">
          {id ? "Update Story" : "Create Story"}
        </Button>
      </Box>
    </Container>
  );
};

export default StoryForm;
