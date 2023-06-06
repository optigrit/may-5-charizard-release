import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import FaceBookIcon from "../../assets/SocialMediaIconImages/icons8-facebook-48.svg";
import InstagramIcon from "../../assets/SocialMediaIconImages/icons8-instagram-48.svg";
import LinkedInIcon from "../../assets/SocialMediaIconImages/icons8-linkedin-circled-48.svg";
import TwitterIcon from "../../assets/SocialMediaIconImages/icons8-twitter-48.svg";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FAFAFA",
        padding: "2.5rem 0rem",
      }}
    >
      <Grid
        container
        direction={{
          xs: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        alignItems="center"
        justifyContent="space-around"
      >
        <Grid item>
          <Typography
            variant="h5"
            sx={{
              marginLeft: "0.85rem",
              fontFamily: "Bodini",
              fontWeight: 600,
              marginBottom: {
                xs: "2rem",
                sm: "2rem",
                md: "0",
                lg: "0",
                xl: "0",
              },
            }}
          >
            OptiGrit
          </Typography>
        </Grid>

        <Grid
          item
          sx={{
            marginBottom: { xs: "2rem", sm: "2rem", md: "0", lg: "0", xl: "0" },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              columnGap: "4rem",
              rowGap: "0.8rem",
            }}
          >
            <Link
              to="/about"
              style={{
                textDecoration: "none",
                color: "#000000",
                fontSize: "0.85rem",
                fontWeight: 400,
              }}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              style={{
                textDecoration: "none",
                color: "#000000",
                fontSize: "0.85rem",
                fontWeight: 400,
              }}
            >
              Contact Us
            </Link>
            <Link
              to="/faqs"
              style={{
                textDecoration: "none",
                color: "#000000",
                fontSize: "0.85rem",
                fontWeight: 400,
              }}
            >
              FAQs
            </Link>
            <Link
              to="/services"
              style={{
                textDecoration: "none",
                color: "#000000",
                fontSize: "0.85rem",
                fontWeight: 400,
              }}
            >
              Services
            </Link>
            <Link
              to="/careers"
              style={{
                textDecoration: "none",
                color: "#000000",
                fontSize: "0.85rem",
                fontWeight: 400,
              }}
            >
              Careers
            </Link>
            <Link
              to="/blog"
              style={{
                textDecoration: "none",
                color: "#000000",
                fontSize: "0.85rem",
                fontWeight: 400,
              }}
            >
              Blog
            </Link>
          </Box>
        </Grid>

        <Grid item>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.8rem",
              marginBottom: {
                xs: "1rem",
                sm: "0.8rem",
                md: "0",
                lg: "0",
                xl: "0",
              },
            }}
          >
            Follow us on:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              columnGap: "0.4rem",
            }}
          >
            <img src={TwitterIcon} alt="social media logo" width="20px" />
            <img src={LinkedInIcon} alt="social media logo" width="20px" />
            <img src={FaceBookIcon} alt="social media logo" width="20px" />
            <img src={InstagramIcon} alt="social media logo" width="20px" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
