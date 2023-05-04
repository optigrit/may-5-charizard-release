import React from "react";
import Carousel from "react-material-ui-carousel";
import { BannerContainerImage } from "../../theme/Banner";
// import Image1 from "../../assets/starters.png"
import Image1 from "../../assets/BannerImages/Banner1.png";

import { CardMedia, Paper } from "@mui/material";

const ContestBanner = (props) => {
  const data = [Image1];

  return (
    <>
      <Carousel
        indicators={false}
        sx={{
          width: "100%",
          // height: { lg: "400px", md: "240px", sm: "260px" },
        }}
        className="carousel1"
      >
        {data.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );

  function Item(props) {
    return (
      <Paper sx={{ boxShadow: "none" }} className="carousel-item">
        {/* <BannerContainerImage src={props.item} /> */}
        <CardMedia
          image={props.item}
          sx={{
            height: { xs: "240px", md: "260px", lg: "400px" },
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
          }}
        />
      </Paper>
    );
  }
};

export default ContestBanner;
