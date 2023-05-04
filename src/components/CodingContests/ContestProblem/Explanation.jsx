import React from "react";
import { Box } from "@mui/system";
import ProblemConstraints from "./ProblemConstraints";
import ProblemMoreInfo from "./ProblemMoreInfo";
import ProblemStatement from "./ProblemStatement";
import ProblemTags from "./ProblemTags";
import ProblemExplanation from "./ProblemExplanation";
import ProblemDataApi from "./ProblemDataApi";
import { useOutletContext } from "react-router-dom";
import { Grid } from "@mui/material";

const Explanation = () => {
  const drawerWidth = 240;

  const problem = useOutletContext();

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          p: 2,paddingRight:"0px!important",
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{ paddingTop: "0px!important", paddingRight:"0px!important"}}
        >
          <ProblemStatement problem={problem} />
          <ProblemExplanation testcases={problem?.explaination} />
          <ProblemDataApi apis={problem?.dataApis} />
          <ProblemConstraints constraints={problem?.constraints} />
          <ProblemMoreInfo
            authors={problem?.author}
            moreInfo={problem?.moreInfo}
          />
          <ProblemTags tags={problem?.tags} />
        </Grid>
      </Grid>
    </>
  );
};

export default Explanation;
