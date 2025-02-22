import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createExercise,
  getExerciseById,
  updateExercise,
} from "../api/exerciseApi";
import { getStories } from "../api/storyApi"; // Only needed if you want to allow story selection in create mode.
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";

const ExerciseForm = () => {
  const { id } = useParams(); // if present, editing existing exercise
  const navigate = useNavigate();

  const [exercise, setExercise] = useState({
    storyId: "",
    question: "",
    options: [],
    level: "easy",
  });
  // We store the storyId of the exercise so we can navigate back
  const [storyIdForNavigation, setStoryIdForNavigation] = useState("");

  // Only needed if you allow choosing a story in CREATE mode
  const [stories, setStories] = useState([]);

  useEffect(() => {
    if (id) {
      // Editing an existing exercise
      fetchExerciseData(id);
    } else {
      // Creating a new exercise
      fetchStoriesData();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchExerciseData = async (exerciseId) => {
    try {
      const data = await getExerciseById(exerciseId);
      setExercise(data);
      setStoryIdForNavigation(data.storyId._id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStoriesData = async () => {
    try {
      const allStories = await getStories();
      setStories(allStories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (field, value) => {
    setExercise({ ...exercise, [field]: value });
  };

  // For managing the array of options
  const addOption = () => {
    setExercise({
      ...exercise,
      options: [
        ...exercise.options,
        { hebrew: "", english: "", isCorrect: false },
      ],
    });
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...exercise.options];
    updatedOptions[index][field] = value;
    setExercise({ ...exercise, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing exercise
        await updateExercise(id, exercise);
        // After updating, navigate back to the story’s detail page
        navigate(`/stories/${storyIdForNavigation}`);
      } else {
        // Create a new exercise
        const created = await createExercise(exercise);
        // The newly created exercise’s storyId is in created.exercise.storyId (depending on your API)
        // Or you might also have exercise.storyId in state
        navigate(`/stories/${exercise.storyId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? "Edit Exercise" : "Create New Exercise"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {/* 
          If we DO NOT have an "id" (i.e. CREATE mode),
          let the user select a story. 
          If we DO have an "id" (EDIT mode),
          hide the story selection completely. 
        */}
        {!id && (
          <TextField
            select
            label="Story"
            value={exercise.storyId}
            onChange={(e) => handleChange("storyId", e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            {stories.map((story) => (
              <MenuItem value={story._id} key={story._id}>
                {story.english} ({story.level})
              </MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          label="Question"
          value={exercise.question}
          onChange={(e) => handleChange("question", e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          select
          label="Level"
          value={exercise.level}
          onChange={(e) => handleChange("level", e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField>

        <Typography sx={{ mb: 1 }}>Options:</Typography>
        {exercise.options.map((opt, index) => (
          <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              label="Hebrew"
              value={opt.hebrew}
              onChange={(e) =>
                handleOptionChange(index, "hebrew", e.target.value)
              }
            />
            <TextField
              label="English"
              value={opt.english}
              onChange={(e) =>
                handleOptionChange(index, "english", e.target.value)
              }
            />
            <TextField
              select
              label="Correct?"
              value={opt.isCorrect}
              onChange={(e) =>
                handleOptionChange(index, "isCorrect", e.target.value)
              }
              sx={{ width: 120 }}
            >
              <MenuItem value={false}>False</MenuItem>
              <MenuItem value={true}>True</MenuItem>
            </TextField>
          </Box>
        ))}

        {!id && (
          <Button variant="outlined" onClick={addOption} sx={{ mb: 2 }}>
            Add Option
          </Button>
        )}

        <Button type="submit" variant="contained">
          {id ? "Update Exercise" : "Create Exercise"}
        </Button>
      </Box>
    </Container>
  );
};

export default ExerciseForm;
