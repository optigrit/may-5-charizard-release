import React, { useState, useEffect } from "react";
import ProblemNavbar from "../../components/CodingContests/ContestProblem/ProblemNavbar";
import SideBarResponsive from "../../components/SideBarResponsive";
import { Box } from "@mui/system";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";

const ContestProblem = () => {
  const { id } = useParams();
  const drawerWidth = 240;
  const [problem, setProblem] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [contest_going, setContest_going]= useState(true)

  useEffect(() => {
    getProblemById();
  }, []);

  const config = {
    headers: { Authorization: `bearer ${process.env.REACT_APP_TOKEN}` },
  };

  const getProblemById = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}problem/${id}`,
        config
      );
      if(res?.data?.contestData?.endingDate < d){
        setContest_going(false)
      }else{
        setContest_going(true)
      }
      setProblem(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  var d = Math.floor(Date.now() / 1000);

  if (isLoading) {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          mt: { xs: "121px", sm: "113px", md: "150px" },
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          p: "16px 0px 16px 0px",
          pl:{xs:"16px",lg:"0px"},
          pr:{xs:"16px",}
        }}
      >
        <ProblemNavbar
          isLoading={isLoading}
          contestStatus={contest_going}
          problem={problem?.probelmData}
        />
        {isLoading === false ? (
          <Outlet context={problem?.probelmData} />
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </>
  );
};

export default ContestProblem;
