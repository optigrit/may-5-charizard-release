import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import { coursesAPI } from "../api/requests/coursesApi";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const Token = localStorage.getItem("Token");
  const decoded = jwt_decode(Token);
  const [isValidCourseId, setIsValidCourseId] = useState(true);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const checkIdValidity = async () => {
    try {
      const response = await coursesAPI.getSpecificCourse(id);
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
      <CircularProgress />
    </Box>
  );

  return (
    <>
      {decoded.role === "SUPERADMIN" && isValidCourseId ? (
        <>{children}</>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default PrivateRoute;
