import React, { memo } from "react";
import { ContainerOfTitle } from "../../theme/VideoSlider";
import Grid from "@mui/material/Grid";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Product.css";
import Skeletons from "../Skeleton/Skeletons";
import CarouselItem from "./CarouselItem";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CourseUnderReview from "../../pages/Courses/CourseUnderReview";

const Product = ({
  title,
  dataRender,
  loading,
  isEditable,
  isUserProfileInProduct,
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 6000, min: 1024 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const navigate = useNavigate();

  return (
    <>
      <Grid sx={{bgcolor:"white",  p:"12px",     mt:"12px",       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",}}>
        <Typography
          variant="h5"
          sx={{
            mt: 1,
            display: "-webkit-box!important",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitBoxOrient: " vertical",
          }}
        >
          {title}
        </Typography>

        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          keyBoardControl={true}
          removeArrowOnDeviceType={["mobile"]}
          className='carousel'
        >

          {loading ? (
            <Box sx={{ display: "flex" }} className="mainSkeletonContainer">
              <Skeletons type="feed1" />
            </Box>
          ) : dataRender?.length ? (
            dataRender?.map((item, index) => {
              return (
                <>
                  { (
                    <CarouselItem
                      ProductDetails={item}
                      key={index}
                      keyfrombackend={item?.id}
                      loading={loading}
                      isEditable={isEditable}
                      isUserProfileInProduct={isUserProfileInProduct}
                    />
                  )}
                </>
              );
            })
          ) : (
            <>
              {isUserProfileInProduct ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="row"
                  sx={{ p: 4, justifyItems: "center" }}
                >
                  <Box>
                    <Typography
                      sx={{
                        m: "auto",
                        fontWeight: "200",
                        fontSize: "13px",
                      }}
                      paragraph
                    >
                      No Courses, you can create your course from
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/create-course`);
                      }}
                    >
                      Create Course
                    </Button>
                  </Box>
                </Box>
              ) : (
                <></>
              )}
            </>
          )}
        </Carousel>
      </Grid>
    </>
  );
};

export default memo(Product);
