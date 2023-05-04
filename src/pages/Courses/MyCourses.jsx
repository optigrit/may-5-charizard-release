import { Box, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../../components/ProductCarousel/Product";
const drawerWidth = 240;

function MyCourses() {
  const [loading, setLoading] = useState(true);
  const [myCoursesData, setMyCoursesData] = useState([]);
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const Token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: `bearer ${Token}`,
    },
  };
  useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}courses/stage/BOUGHT`,
          config
        );
        setMyCoursesData(res?.data);
        setLoading(false);
      } catch (err) {}
    };
    data();
  }, []);

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}courses/1`,
          config
        );
        setSuggestedCourses(res?.data);
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
