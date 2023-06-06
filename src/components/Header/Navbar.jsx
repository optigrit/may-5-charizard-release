import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "1.5rem 1.5rem",
      }}
    >
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Bodini",
              fontWeight: 600,
              marginRight: "3rem",
              marginLeft: "2rem",
            }}
          >
            OptiGrit
          </Typography>
        </Grid>
        <Grid item>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#000000",
              fontSize: "1rem",
              fontWeight: 400,
              marginLeft: "2rem",
            }}
          >
            Home
          </Link>
        </Grid>
        <Grid item>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "#000000",
              fontSize: "1rem",
              fontWeight: 400,
              marginLeft: "2rem",
            }}
          >
            About Us
          </Link>
        </Grid>
        <Grid item>
          <Link
            to="/services"
            style={{
              textDecoration: "none",
              color: "#000000",
              fontSize: "1rem",
              fontWeight: 400,
              marginLeft: "2rem",
            }}
          >
            Services
          </Link>
        </Grid>
        <Grid item>
          <Link
            to="/blog"
            style={{
              textDecoration: "none",
              color: "#000000",
              fontSize: "1rem",
              fontWeight: 400,
              marginLeft: "2rem",
            }}
          >
            Blog
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
