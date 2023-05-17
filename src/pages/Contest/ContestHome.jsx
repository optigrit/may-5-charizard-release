import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import ContestContainer from "../../components/CodingContests/ContestHome/ContestContainer";
import RankingContainer from "../../components/Ranking/RankingContainer";
import Carousel1 from "../../components/CarouselForBanner";
import { Grid } from "@mui/material";
import Image1 from "./Images/Banner1.png";
import Image2 from "./Images/BannerContestPageSecond.png";
import { contestAPI } from "../../api/requests/contests/contestAPI";
import { contestRankAPI } from "../../api/requests/contests/contestRankAPI";

const BannerData = [Image1];
const BannerData2 = [Image2];

//Week top performers
const topPerformers = [
  {
    id: 1,
    joinedOn: "Joined on 23 Oct",
    rating: 3799,
    rank: "1st",
    problems: 3799,
    name: "Max_Jack",
  },
  {
    id: 2,
    joinedOn: "Joined on 23 Oct",
    rating: 3799,
    rank: "1st",
    problems: 3799,
    name: "Max_Jack",
  },
  {
    id: 3,
    joinedOn: "Joined on 23 Oct",
    rating: 3799,
    rank: "1st",
    problems: 3799,
    name: "Max_Jack",
  },
  {
    id: 4,
    joinedOn: "Joined on 23 Oct",
    rating: 3799,
    rank: "1st",
    problems: 3799,
    name: "Max_Jack",
  },
  {
    id: 5,
    joinedOn: "Joined on 23 Oct",
    rating: 3799,
    rank: "1st",
    problems: 3799,
    name: "Max_Jack",
  },
  {
    id: 6,
    joinedOn: "Joined on 23 Oct",
    rating: 3799,
    rank: "1st",
    problems: 3799,
    name: "Max_Jack",
  },
];

const ContestHome = () => {
  useEffect(() => {
    getContests();
  }, []);

  const [Contests, setContests] = useState([]);

  const [togglemenu, setTogglemenu] = useState(false);

  const getContests = async () => {
    try {
      const data = await contestAPI.getContests();
      if (data !== "no upcoming contests for now") {
        setContests(data);
      }
    } catch (err) {}
  };

  const [rankings, setRankings] = useState([]);

  const getRanks = async () => {
    try {
      const data = await contestRankAPI.getGlobalRanks(1);
      setRankings(Object.keys(data).length === 0 ? [] : []);
    } catch (err) {}
  };
  
  useEffect(() => {
    getRanks();
  }, []);

  var presentContests = [];
  var upcomingContests = [];
  var d = Math.floor(Date.now() / 1000);

  for (var i = 0; i < Contests.length; i++) {
    if (Contests[i].endingDate > d && Contests[i].startingDate >= d) {
      upcomingContests.push(Contests[i]);
    } else {
      presentContests.push(Contests[i]);
    }
  }

  const drawerWidth = 240;

  return (
    <>
      {/* <SideBarResponsive /> */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
        // display: { xs: "none", sm: isContestPage ? "none" : "block",lg: isContestPage ? "block" : "none" },
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ paddingTop: "0px!important", bgcolor: "" }}
          >
            <Carousel1 BannerImages={BannerData} lgHeight={"400px"} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8} sx={{ paddingTop: "0px!important" }}>
            <ContestContainer
              title="Present Coding Contest"
              Contests={presentContests}
            />
            <Box mt={2}>
              <ContestContainer
                title="Upcoming Coding Contest"
                Contests={upcomingContests}
                startedContest="true"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              paddingTop: "0px!important",
              display: { xs: "none", md: "block" },
            }}
          >
            <RankingContainer title="Global Ranking" rankings={rankings} />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8} sx={{ paddingTop: "0px!important" }}>
            <Grid item xs={12} mb={2}>
              <Carousel1 BannerImages={BannerData2} lgHeight={"210px"} />
            </Grid>
            {/* <WeekTopPerformers topPerformers={topPerformers} /> */}
          </Grid>
          <Grid item xs={12} md={4} sx={{ paddingTop: "0px!important" }}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                paddingTop: "0px!important",
                my: 2,
                display: { xs: "block", md: "none" },
              }}
            >
              <RankingContainer title="Global Ranking" rankings={rankings} />
            </Grid>

            {/* <RankingContainer
              title="Global Ranking for testers"
              rankings={rankings}
            /> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContestHome;
