import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "../../components/ProductCarousel/Product";
import { courseAPI } from "../../api/requests/courses/courseAPI";
import { courseStageAPI } from "../../api/requests/courses/courseStageAPI";
const drawerWidth = 240;

function MyCourses() {
  const [loading, setLoading] = useState(true);
  const [myCoursesData, setMyCoursesData] = useState([]);
  const [suggestedCourses, setSuggestedCourses] = useState([]);

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const data = await courseStageAPI.getCourses("BOUGHT");
        setMyCoursesData(data && data);
        setLoading(false);
      } catch (err) {}
    };
    data();
  }, []);

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const data = await courseAPI.getCoursesByPage(1);
        setSuggestedCourses(data && data);
        setLoading(false);
      } catch (err) {}
    };
    data();
  }, []);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Product
          title={"My Courses"}
          dataRender={myCoursesData}
          loading={loading}
        />
        <Divider sx={{ mb: 2 }} />
        <Product
          title={"Suggested Courses"}
          dataRender={suggestedCourses}
          loading={loading}
        />
      </Box>
    </>
  );
}

export default MyCourses;
