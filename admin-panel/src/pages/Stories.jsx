// src/pages/Stories.jsx
import { useEffect, useState } from "react";
import { getStories, getStoriesByLevel } from "../api/storyApi";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LevelFilter from "../components/LevelFilter";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [levelFilter, setLevelFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [levelFilter]);

  const fetchData = async () => {
    try {
      if (levelFilter) {
        const data = await getStoriesByLevel(levelFilter);
        setStories(data);
      } else {
        const data = await getStories();
        setStories(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Stories
      </Typography>

      {/* Level Filter */}
      <Box display="flex" alignItems="center" mb={2}>
        <LevelFilter value={levelFilter} onChange={setLevelFilter} />
        <Button
          variant="contained"
          onClick={() => navigate("/stories/new")}
          sx={{ height: 56 }}
        >
          Create New Story
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hebrew</TableCell>
            <TableCell>English</TableCell>
            <TableCell>Transliteration</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stories.map((story) => (
            <TableRow key={story._id}>
              <TableCell>{story.hebrew}</TableCell>
              <TableCell>{story.english}</TableCell>
              <TableCell>{story.transliteration}</TableCell>
              <TableCell>{story.level}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/stories/${story._id}`)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Stories;
