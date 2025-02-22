// src/components/Navbar.js
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hebrew Learning Admin
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/stories">
          Stories
        </Button>
        {/* <Button color="inherit" component={Link} to="/exercises">
          Exercises
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
