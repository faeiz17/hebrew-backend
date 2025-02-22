// src/pages/StoryDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStoryById } from "../api/storyApi";
import {
  getExercisesByStoryId,
  createExercise,
  deleteExercise,
} from "../api/exerciseApi";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({
    storyId: id,
    question: "",
    options: [],
    level: "easy",
  });

  useEffect(() => {
    fetchStory();
    fetchExercises();
    // eslint-disable-next-line
  }, [id]);

  const fetchStory = async () => {
    try {
      const data = await getStoryById(id);
      setStory(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExercises = async () => {
    try {
      const data = await getExercisesByStoryId(id);
      setExercises(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Create new Exercise for this Story
  const handleCreateExercise = async () => {
    try {
      await createExercise(newExercise);
      setNewExercise({
        storyId: id,
        question: "",
        options: [],
        level: "easy",
      });
      fetchExercises();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      await deleteExercise(exerciseId);
      fetchExercises();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExerciseChange = (field, value) => {
    setNewExercise({ ...newExercise, [field]: value });
  };

  // For inline "options" array
  const addOption = () => {
    setNewExercise({
      ...newExercise,
      options: [
        ...newExercise.options,
        { hebrew: "", english: "", isCorrect: false },
      ],
    });
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...newExercise.options];
    updatedOptions[index][field] = value;
    setNewExercise({ ...newExercise, options: updatedOptions });
  };

  if (!story) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography>Loading story...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      {/* --- STORY CARD --- */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {story.english} ({story.level})
          </Typography>
          <Typography variant="body1">
            <strong>Hebrew:</strong> {story.hebrew}
          </Typography>
          <Typography variant="body1">
            <strong>Transliteration:</strong> {story.transliteration}
          </Typography>
        </CardContent>
      </Card>

      {/* --- EXERCISES TABLE --- */}
      <Typography variant="h6" gutterBottom>
        Exercises for this Story
      </Typography>
      {exercises.length === 0 ? (
        <Typography>No exercises found for this story.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Options Count</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercises.map((ex) => (
              <TableRow key={ex._id}>
                <TableCell>{ex.question}</TableCell>
                <TableCell>{ex.level}</TableCell>
                <TableCell>{ex.options.length}</TableCell>
                <TableCell>
                  {/* EDIT BUTTON */}
                  <IconButton
                    onClick={() => navigate(`/exercises/edit/${ex._id}`)}
                  >
                    <EditIcon color="primary" />
                  </IconButton>

                  {/* DELETE BUTTON */}
                  <IconButton onClick={() => handleDeleteExercise(ex._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* --- CREATE A NEW EXERCISE FOR THIS STORY --- */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Create a New Exercise for This Story
        </Typography>
        <TextField
          label="Question"
          fullWidth
          sx={{ mb: 2 }}
          value={newExercise.question}
          onChange={(e) => handleExerciseChange("question", e.target.value)}
        />

        {/* <TextField
          select
          label="Level"
          value={newExercise.level}
          onChange={(e) => handleExerciseChange("level", e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </TextField> */}

        <Typography variant="subtitle1">Options:</Typography>
        {newExercise.options.map((opt, index) => (
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
              label="Is Correct?"
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
        <Button variant="outlined" onClick={addOption} sx={{ mr: 2 }}>
          Add Option
        </Button>
        <Button variant="contained" onClick={handleCreateExercise}>
          Create Exercise
        </Button>
      </Box>
    </Container>
  );
};

export default StoryDetails;
