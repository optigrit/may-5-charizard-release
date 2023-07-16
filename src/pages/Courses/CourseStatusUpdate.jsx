import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import SideBarResponsive from "../../components/SideBarResponsive";
import { courseAPI } from "../../api/requests/courses/courseAPI";
import { useState, useEffect } from "react";
import PageNotFound from "../PageNotFound/PageNotFound";

const CourseStatusUpdate = () => {
  const drawerWidth = 240;
  const { id } = useParams();
  const [isValidCourseId, setIsValidCourseId] = useState(true);
  const [loading, setLoading] = useState(true);

  const updateCourseStatus = async (status) => {
    try {
      await courseAPI.updateCourseStatus({ status: status }, id);
    } catch (err) {}
  };

  const checkIdValidity = async () => {
    try {
      const response = await courseAPI.getSpecificCourse(id);
      setIsValidCourseId(response && true);
    } catch (error) {
      {
        error.request.status === 404 && setIsValidCourseId(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIdValidity(id);
  }, []);

  
  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress/>
      </Box>
    );

  return (
    <>
      {isValidCourseId ? (
        <>
          <SideBarResponsive />
          <Box
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              height: "100vh",
            }}
          >
            <Typography variant="h5" mb={4} sx={{ textAlign: "center" }}>
              Update Course Status
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                direction={{ md: "row" }}
                p={5}
                alignItems="center"
                justifyContent="space-between"
                spacing={{ xs: 3, sm: 2, md: 4 }}
                sx={{
                  width: { lg: "80%", xl: "70%" },
                  borderRadius: "4px",
                  backgroundColor: "#f2f0f0",
                }}
              >
                <Stack>
                  <Typography variant="bod2" sx={{ fontWeight: "bold" }}>
                    Course ID
                  </Typography>
                  <Typography variant="body1" sx={{ color: "grey" }}>
                    {id}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button
                    onClick={() => updateCourseStatus("APPROVED")}
                    variant="contained"
                    sx={{
                      bgColor: "#698AFF",
                    }}
                  >
                    APPROVE
                  </Button>
                  <Button
                    onClick={() => updateCourseStatus("UNDERREVIEW")}
                    variant="contained"
                    style={{ backgroundColor: "#928E85" }}
                  >
                    UNDERREVIEW
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default CourseStatusUpdate;
