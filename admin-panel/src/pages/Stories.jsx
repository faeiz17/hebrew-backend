import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getStories, getStoriesByLevel, deleteStory } from "../api/storyApi";
import LevelFilter from "../components/LevelFilter"; // Optional if you want level filtering

const Stories = () => {
  const navigate = useNavigate();

  // --- State ---
  const [stories, setStories] = useState([]);
  const [levelFilter, setLevelFilter] = useState(""); // for optional level filtering
  const [sortField, setSortField] = useState("english"); // which field to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // or "desc"

  // Pagination states
  const [page, setPage] = useState(0); // current page index
  const [rowsPerPage, setRowsPerPage] = useState(3); // how many rows per page

  // --- Effects ---
  useEffect(() => {
    fetchStories();
    // eslint-disable-next-line
  }, [levelFilter]);

  // --- Data Fetch ---
  const fetchStories = async () => {
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

  // --- Sorting Logic (client side) ---
  const sortedStories = [...stories].sort((a, b) => {
    let fieldA = a[sortField];
    let fieldB = b[sortField];

    // Make sure we handle string vs. other types gracefully
    if (typeof fieldA === "string") fieldA = fieldA.toLowerCase();
    if (typeof fieldB === "string") fieldB = fieldB.toLowerCase();

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // --- Pagination Logic (client side) ---
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Slice the sorted data according to current page
  const paginatedStories = sortedStories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // --- Handlers ---
  const handleDelete = async (id) => {
    try {
      await deleteStory(id);
      fetchStories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Stories
      </Typography>

      {/* Level Filter (Optional) + Create Button */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        {/* If you want level filtering */}
        <LevelFilter value={levelFilter} onChange={setLevelFilter} />

        <Button variant="contained" onClick={() => navigate("/stories/new")}>
          CREATE NEW STORY
        </Button>
      </Box>

      {/* Sorting Controls */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <FormControl>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortField}
            label="Sort By"
            onChange={(e) => setSortField(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="hebrew">Hebrew</MenuItem>
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="transliteration">Transliteration</MenuItem>
            <MenuItem value="level">Level</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="sort-order-label">Order</InputLabel>
          <Select
            labelId="sort-order-label"
            value={sortOrder}
            label="Order"
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{ width: 120 }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Stories Table */}
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
          {paginatedStories.map((story) => (
            <TableRow key={story._id}>
              <TableCell>{story.hebrew}</TableCell>
              <TableCell>{story.english}</TableCell>
              <TableCell>{story.transliteration}</TableCell>
              <TableCell>{story.level}</TableCell>
              <TableCell>
                {/* EDIT Button */}
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/stories/edit/${story._id}`)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                {/* DELETE Button */}
                <IconButton
                  color="error"
                  onClick={() => handleDelete(story._id)}
                  sx={{ mr: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
                {/* VIEW DETAILS Button */}
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/stories/${story._id}`)}
                >
                  VIEW DETAILS
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Table Pagination Controls */}
      <TablePagination
        component="div"
        count={sortedStories.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 5, 10]}
      />
    </Container>
  );
};

export default Stories;
