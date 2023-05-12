import React from "react";
import Grid from "@mui/material/Grid";
import ContestCard from "./ContestCard";
import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ContestContainer = ({ title, Contests, startedContest }) => {
  var d = Math.floor(Date.now() / 1000);

  return (
    <>
      <Grid container justifyContent="flex-start" rowSpace={1}>
        <Grid item xs={12} sx={{ bgcolor: "#FAFCFE", p: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "500", fontSize: { xs: "16px", md: "20px" } }}
          >
            {title}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            p: { xs: 0, md: 2 },
            pt: 0,
            flexGrow: 1,
            border: { xs: 0, md: 1 },
            borderColor: { xs: "none", md: "#e5e5e5" },
            backgroundColor: "#g1g1g1",
          }}
        >
          {Contests?.length > 0 ? (
            Contests.map((Contest, index) => {
              return (
                <>
                  {Contest.endingDate > d && Contest.startingDate < d ? (
                    <NavLink
                      to={`/contest/${Contest.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ContestCard
                        key={index}
                        Contest={Contest}
                        startedContest={startedContest}
                      />
                    </NavLink>
                  ) : (
                    <ContestCard
                      key={index}
                      Contest={Contest}
                      startedContest={startedContest}
                    />
                  )}
                </>
              );
            })
          ) : (
            <Box m={4}>
              <Typography
                sx={{
                  m: "auto",
                  fontWeight: "200",
                  alignItems: "center",
                  textAlign: "center",
                  py: 4,
                }}
                paragraph
              >
                No contests, Please check back soon
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ContestContainer;
