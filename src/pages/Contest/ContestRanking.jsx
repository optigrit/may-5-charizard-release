import React, { useState, useEffect, useCallback } from "react";
import RankingNavbar from "../../components/CodingContests/ContestRanking/RankingNavbar";
import { useParams } from "react-router-dom";
import RankingTable from "../../components/CodingContests/ContestRanking/RankingTable";
import RankingTableUserInfo from "../../components/CodingContests/ContestRanking/RankingTableUserInfo";
import { CardMedia, Grid } from "@mui/material";
import bannerImage from "../../assets/CourseImages/SideBanner.png";
import { contestAPI } from "../../api/requests/contests/contestAPI";
import { contestRankAPI } from "../../api/requests/contests/contestRankAPI";

const ContestRanking = () => {
  const { contestId, time, contest_code } = useParams();
  const [newObj, setNew] = useState([]);
  const [page, setPage] = React.useState(1);
  const [searchField, setSearchField] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  useEffect(() => {
    getContestRanks();
  }, [page]);

  const [id, setId] = useState(1);

  const getContestRanks = async () => {
    try {
      const data = await contestRankAPI.getContestRanks(contestId, page);
      setNew(data?.ranks);
    } catch (err) {}
  };

  var perPage = 15;

  const ids = new Map([
    [1, "country"],
    [2, "instituteName"],
    [3, "instituteType"],
  ]);

  const handleSearchFromApi = async () => {
    try {
      const data = await contestAPI.searchUser(
        contestId,
        searchField,
        ids.get(id),
        filterSearch
      );
      setNew(data);
    } catch (err) {}
  };

  const is_ranking = true;
  const is_scoring = false;

  let ranking_columns = [];

  let ranking_rows = [];

  ranking_columns = [
    { id: "rank", label: "Rank", minWidth: 100 },

    // {
    //   id: "institute_type",
    //   // label: "Institute Type",
    //   // minWidth: 120,
    //   align: "left",
    // },
    {
      id: "userinfo",
      label: "User",
      // minWidth: 200,
      align: "right",
    },
    {
      id: "score",
      label: "Total Score",
      // minWidth: 200,
      align: "left",
    },
  ];
  const data = [
    {
      country: "China",
      countryCode: "CN",
      firstName: "Haydon",
      instituteName: "Francolinus swainsonii",
      // instituteType: "no,",
      lastName: "Falcus",
      profilePhotoLink: "http://dummyimage.com/196x100.png/5fa2dd/ffffff",
      totalParticipants: 1000,
      totalScore: "49",
      userId: "f4e12217-a6d6-4c15-bd16-2b36f31f584b",
      username: "hfalcus0",
      score: "20",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
    {
      country: "Mauritius",
      countryCode: "MU",
      firstName: "Margarette",
      instituteName: "Funambulus pennati",
      // instituteType: " HCl",
      lastName: "Giorgione",
      profilePhotoLink: "http://dummyimage.com/156x100.png/cc0000/ffffff",
      totalParticipants: 1000,
      totalScore: "306",
      userId: "abcfb034-0d18-45b8-bb62-525eac515172",
      username: "mgiorgione1",
      score: "50",
    },
  ];

  function ranking_createData(rank, userinfo, score) {
    return { rank, userinfo, score };
  }

  //   if (newObj?.length > 0) {
  //     for (let i = 0; i < newObj?.length; i++) {
  //       ranking_rows.push(
  //         ranking_createData(
  //           (page - 1) * 15 + (i + 1),
  //           <RankingTableUserInfo person={newObj[i]} />,
  //           newObj[i]?.instituteType,
  //           newObj[i]?.totalScore
  //         )
  //       );
  //     }
  //   }
  if (data?.length > 0) {
    for (let i = 0; i < data?.length; i++) {
      ranking_rows.push(
        ranking_createData(
          (page - 1) * 15 + (i + 1),
          <RankingTableUserInfo person={data[i]} />,
          data[i]?.totalScore
        )
      );
    }
  }

  const drawerWidth = 240;
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
          <RankingNavbar
            setSearchField={setSearchField}
            is_scoring={is_scoring}
            contest_code={contest_code}
            contestId={contestId}
            setId={setId}
            time={time}
            handleSearchUser={handleSearchFromApi}
            searchField={searchField}
            setFilterSearch={setFilterSearch}
          />

          {/* <ContestRankingContainer people={intersect(filteredNames, array)} /> */}
          <RankingTable
            is_scoring={is_scoring}
            is_ranking={is_ranking}
            people={newObj}
            totalRanks={15 * (page - 1) + newObj?.length}
            setPage={setPage}
            page={page}
            columns={ranking_columns}
            rows={ranking_rows}
            perPage={perPage}
          />
        </Grid>
        <Grid
          item
          xs={0}
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
              height: { lg: "98%" },
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

export default ContestRanking;
