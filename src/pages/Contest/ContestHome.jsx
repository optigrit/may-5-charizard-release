import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SideBarResponsive from "../../components/SideBarResponsive/index";
// import Carousel1 from '../../components/Carousel/index';
import WeekTopPerformers from "../../components/WeekTopPerfomers/index";
import ContestContainer from "../../components/CodingContests/ContestHome/ContestContainer";
import RankingContainer from "../../components/Ranking/RankingContainer";
import Carousel1 from "../../components/CarouselForBanner";
import axios from "axios";
import { Fab, Grid } from "@mui/material";
import Image1 from "./Images/Banner1.png";
import Image2 from "./Images/BannerContestPageSecond.png";
import MenuIcon from "@mui/icons-material/Menu";

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
    getContest();
  }, []);

  const [Contests, setContests] = useState([]);

  const [togglemenu, setTogglemenu] = useState(false);
  console.log(togglemenu, "togglemenu");

  const Token = localStorage.getItem("Token");

  const config = {
    headers: { Authorization: `bearer ${Token}` },
  };

  const getContest = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}contest`,
        config
      );
      if (res.data !== "no upcoming contests for now") {
        setContests(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [rankings, setRankings] = useState([]);

  const getRanks = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}globalrankings/DEV`,
        config
      );
      setRankings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRanks();
  }, []);

  // 3,45,600
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
