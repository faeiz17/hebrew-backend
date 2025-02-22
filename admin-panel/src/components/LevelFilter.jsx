/* eslint-disable react/prop-types */
// src/components/LevelFilter.js
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const LevelFilter = ({ value, onChange }) => {
  return (
    <Box sx={{ minWidth: 120, marginRight: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Level</InputLabel>
        <Select
          label="Level"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LevelFilter;
