import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import SideBarResponsive from "../../SideBarResponsive";
import RankingNavbar from "../ContestRanking/RankingNavbar";
import RankingTable from "../../CodingContests/ContestRanking/RankingTable";
import RankingTableUserInfo from "../ContestRanking/RankingTableUserInfo";
import axios from "axios";
import { CardMedia, Grid } from "@mui/material";
import bannerImage from "../../../assets/CourseImages/SideBanner.png";

const ViewAll = () => {
  const view = [
    {
      totalScore: 25,
      username: "bc",
      firstName: "bcc",
      lastName: "jack",
      instituteType: "school",
      instituteName: "IIT",
      countryCode: "IN",
      country: "India",
      profilePhotoLink:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
      userId: "a3e44cb9-1ab5-4f28-a565-3fdce5452e2e",
    },
    {
      totalScore: 25,
      username: "bc",
      firstName: "bcc",
      lastName: "jack",
      instituteType: "school",
      instituteName: "IIT",
      countryCode: "IN",
      country: "India",
      profilePhotoLink:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
      userId: "a3e44cb9-1ab5-4f28-a565-3fdce5452e2e",
    },
    {
      totalScore: 25,
      username: "bc",
      firstName: "bcc",
      lastName: "jack",
      instituteType: "school",
      instituteName: "IIT",
      countryCode: "IN",
      country: "India",
      profilePhotoLink:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
      userId: "a3e44cb9-1ab5-4f28-a565-3fdce5452e2e",
    },
    {
      totalScore: 25,
      username: "bc",
      firstName: "bcc",
      lastName: "jack",
      instituteType: "school",
      instituteName: "IIT",
      countryCode: "IN",
      country: "India",
      profilePhotoLink:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
      userId: "a3e44cb9-1ab5-4f28-a565-3fdce5452e2e",
    },
  ];

  const [ranks, setRanks] = useState([]);
  const [newObj, setNew] = useState([]);
  const [page, setPage] = React.useState(1);
  const [searchField, setSearchField] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    getAllRanks();
  }, [page]);

  // const [id, setId] = useState(1)

  const getAllRanks = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}globalrankings/DEV/${page}`
      );
      //   console.log(res?.data?.data,"res?.data?.data")
      setNew(res?.data?.data);
      setRanks(res?.data.totalParticipants);
    } catch (err) {
      console.log(err);
    }
  };

  // const ids = new Map([
  //     [1,"country"],
  //     [2,"instituteName"],
  //     [3,"instituteType"]
  //   ]);

  // const handleSearchFromApi = async () => {
  //     try {
  //         const res = await axios.get(
  //             `http://localhost:8080/user/contest/${contest_id}?search=${searchField}&${ids.get(id)}=${filterSearch}`
  //         );
  //         setNew(res?.data);
  //     } catch (err) {
  //         console.log(err, "error");
  //     }
  // };

  const drawerWidth = 240;

  let is_viewAll = true;

  let viewAll_columns = [];

  let viewAll_rows = [];

  viewAll_columns = [
    { id: "rank", label: "Rank", minWidth: 400 },
    {
      id: "userinfo",
      label: "User",
      minWidth: 300,
      align: "center",
    },
    {
      id: "rating",
      label: "Rating",
      minWidth: 500,
      align: "right",
    },
  ];

  function viewAll_createData(rank, userinfo, rating) {
    return { rank, userinfo, rating };
  }

  for (let i = 0; i < newObj?.length; i++) {
    viewAll_rows.push(
      viewAll_createData(
        (page - 1) * 50 + (i + 1),
        <RankingTableUserInfo person={newObj[i]} />,
        newObj[i].totalScore
      )
    );
  }

  return (
    <>
      <Grid
        container
        sx={{
          flexGrow: 1,
          // p: { xs: "16px 0px 0px 0px", sm: 2 },
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Grid item xs={12} lg={9} sx={{ paddingTop: "0px!important" }}>
          <RankingNavbar is_viewAll={is_viewAll} />

          <RankingTable
            perPage={50}
            totalRanks={ranks}
            is_viewAll={is_viewAll}
            rows={viewAll_rows}
            columns={viewAll_columns}
          />
        </Grid>
        <Grid
          itemxs={0}
          lg={3}
          display={{ xs: "none", lg: "block" }}
          sx={{
            paddingTop: "0px!important",
            height: { xs: "none", lg: "100vh" },
          }}
        >
          <CardMedia
            sx={{
              border: "1px solid #F0EFF2",
              padding: "16px 16px",
              height: { xs: "400px", md: "98%" },
            }}
            component="img"
            alt="green iguana"
            image={bannerImage}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ViewAll;
