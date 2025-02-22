// src/pages/Home.js
import { Container, Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome to the Hebrew Learning Admin
        </Typography>
        <Typography variant="body1">
          Manage your Stories and Exercises easily with this admin panel.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
