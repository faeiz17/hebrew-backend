// src/pages/Exercises.jsx
import { useEffect, useState } from "react";
import {
  getExercises,
  getExercisesByLevel,
  deleteExercise,
} from "../api/exerciseApi";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LevelFilter from "../components/LevelFilter";
import { useNavigate } from "react-router-dom";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [levelFilter, setLevelFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [levelFilter]);

  const fetchData = async () => {
    try {
      if (levelFilter) {
        const data = await getExercisesByLevel(levelFilter);
        setExercises(data);
      } else {
        const data = await getExercises();
        setExercises(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExercise(id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Exercises
      </Typography>

      {/* Level Filter & Create Button */}
      <Box display="flex" alignItems="center" mb={2}>
        <LevelFilter value={levelFilter} onChange={setLevelFilter} />
        {/* <Button
          variant="contained"
          onClick={() => navigate("/exercises/new")}
          sx={{ height: 56 }}
        >
          Create New Exercise
        </Button> */}
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Story</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((ex) => (
            <TableRow key={ex._id}>
              <TableCell>{ex.question}</TableCell>
              <TableCell>{ex.level}</TableCell>
              <TableCell>
                {ex.storyId ? ex.storyId.english : "No Story Linked"}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(ex._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Exercises;
