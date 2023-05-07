import React, { useState, useEffect, memo, useMemo } from "react";
import { Box } from "@mui/system";
import SideBarResponsive from "../../components/SideBarResponsive/index";
import ContestBanner from "../../components/Banner/ContestBanner";
import ScorableProblems from "../../components/CodingContests/ContestDetailPage/ScorableProblems/ScorableProblems";
import Announcements from "../../components/CodingContests/ContestDetailPage/announcements/Announcements";
import RecruiterSponsor from "../../components/CodingContests/ContestDetailPage/RecruiterSponsor/RecruiterSponsor";
import RulesRegulations from "../../components/CodingContests/ContestDetailPage/rulesRegulations/RulesRegulations";
import AboutContest from "../../components/CodingContests/ContestDetailPage/aboutContest/AboutContest";
import UpcomingContestCarousel from "../../components/CodingContests/UpcomingContestCarousel";
import ShowRank from "../../components/CodingContests/ShowRank";
import BreadCrumb from "../../components/CodingContests/ContestDetailPage/BreadCrumb";
import { useParams } from "react-router-dom";
import axios from "axios";
import Clock from "../../components/CodingContests/ContestDetailPage/Clock";
import { ContainerOfTitle, ContestTitle } from "../../theme/VideoSlider";
import { Grid, Typography } from "@mui/material";

const ContestDetail = () => {
  const { contest_code, contest_id } = useParams();

  const getLocalItems = () => {
    const ContestValue = sessionStorage.getItem("Contest");

    if (ContestValue) {
      return JSON.parse(sessionStorage.getItem("Contest"));
    } else {
      return [];
    }
  };

  const [Contest, setContest] = useState();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getContest();
  }, []);
  useEffect(() => {
    getAnnouncements();
  }, []);

  // sessionStorage.setItem('Contest', JSON.stringify(Contest))

  const Token = localStorage.getItem("Token");

  const config = {
    headers: { Authorization: `bearer ${Token}` },
  };

  var contest_going = true;

  const getContest = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}contest/${contest_id}`,
        config
      );
      setContest(res.data);
      console.log(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}announcements/${contest_id}`,
        config
      );
      setAnnouncements(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const selected = (crumb) => {};

  const drawerWidth = 240;

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          m: 0,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          p: 2,
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{ paddingTop: "0px!important", paddingLeft: "0px!important" }}
        >
          <ContestBanner />
        </Grid>
        <Grid item xs={12} md={12} sx={{ paddingLeft: "0px!important" }}>
          <BreadCrumb
            sx={{ mt: 0 }}
            selected={selected}
            contest_code={Contest?.contestData[0]?.code}
          />
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "16px", md: "20px" },
              mt: 2,
              ml: 1.5,
              display: { xs: "block", md: "none" },
            }}
          >
            {" "}
            {Contest?.contestData[0]?.title}
          </Typography>
        </Grid>
        <Grid container spacing={2} sx={{ mt: { xs: 0, md: 2 } }}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ paddingTop: "0px!important", mt: { xs: 4, md: 0 } }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                mb: 2,
                display: { xs: "none", md: "block" },
              }}
            >
              {Contest?.contestData[0]?.title}
            </Typography>
            <ScorableProblems
              contestStatus={contest_going}
              ContestProbs={Contest?.problemData}
              contest_id={contest_id}
            />
            {announcements.length > 0 && (
              <Announcements announcements={announcements} />
            )}
            {Contest?.contestData[0]?.sponsers?.length > 0 && (
              <RecruiterSponsor
                recruiterSponsors={Contest?.contestData[0]?.sponsers}
              />
            )}
            <AboutContest
              about={Contest?.contestData[0]?.about}
              duration={
                Contest?.contestData[0]?.endingDate -
                Contest?.contestData[0]?.startingDate
              }
              ed={Contest?.contestData[0]?.endingDate}
              sd={Contest?.contestData[0]?.startingDate}
            />
            {Contest?.contestData[0]?.rules?.length > 0 && (
              <RulesRegulations rules={Contest?.contestData[0]?.rules} />
            )}
          </Grid>
          <Grid item xs={12} display={{ xs: "block", md: "none" }}>
            <Clock
              startingDate={parseInt(Contest?.contestData[0]?.startingDate)}
              duration={parseInt(
                Contest?.contestData[0]?.endingDate -
                  Contest?.contestData[0]?.startingDate
              )}
              contest_going={contest_going}
            />

            <ShowRank
              contestStatus={contest_going}
              contest_id={contest_id}
              time={Contest?.contestData[0]?.endingDate}
              contest_code={contest_code}
            />
            <UpcomingContestCarousel />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              paddingTop: "0px!important",
              display: { xs: "none", md: "block" },
              mt: { xs: 4, md: 6 },
            }}
          >
            <Clock
              startingDate={parseInt(Contest?.contestData[0]?.startingDate)}
              duration={parseInt(
                Contest?.contestData[0]?.endingDate -
                  Contest?.contestData[0]?.startingDate
              )}
              contest_going={contest_going}
            />
            <UpcomingContestCarousel />
            <ShowRank
              contestStatus={contest_going}
              contest_id={contest_id}
              time={Contest?.contestData[0]?.endingDate}
              contest_code={contest_code}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(ContestDetail);
