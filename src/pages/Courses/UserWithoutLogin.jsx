import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image2 from "../../assets/CourseImages/Banner1.png";
import Carousel1 from "../../components/CarouselForBanner";
import Filter from "../../components/Filter";
import Product from "../../components/ProductCarousel/Product";

function UserWithoutLogin() {
  const drawerWidth = 240;
  const BannerData = [Image2];

  const [data2, setData2] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterItems, setFilterItems] = useState(data2);
  const [highest, setHighest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoad, setSearchLoad] = useState(false);

  const Token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: `bearer ${Token}`,
    },
  };

  const onSearchChangeName = (event) => {
    const searchFieldString = event.target.value;
    setSearchKeyword(searchFieldString);
    if (event.target.value === "") {
      setFilterItems(data2);
    }
  };

  const filteredItems = () => {
    let Highest = data2?.filter((item) => {
      return item.ratings > 4;
    });
    setHighest([...Highest]);
  };
  const handleReset = () => {
    setFilterItems(data2);
    setSearchKeyword("");
  };

  const handleClickCategory = (event) => {
  };
  const handleSearchFromApi = async () => {
    setSearchLoad(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}course/search?search=${searchKeyword}`
      );
      setFilterItems(res?.data);
      setSearchLoad(false);
    } catch (err) {}
  };

  useEffect(() => {
    handleSearchFromApi();
  }, []);
  useEffect(() => {
    filteredItems();
  }, [data2]);
  return (
    <>
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Carousel1 BannerImages={BannerData} lgHeight={"400px"} mb="16px"/>
        <Filter
            data={data2}
            handleSeach={onSearchChangeName}
            handleClickCategory={handleClickCategory}
            searchLoad={searchLoad}
            handleSearchFromApi={handleSearchFromApi}
            handleReset={handleReset}
            searchKeyword={searchKeyword}
            
          />
          <Product title={"Our Courses"} dataRender={filterItems} />
          <Product title={"Highest Rated Courses"} dataRender={highest} />
      </Box> */}
         <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        
      </Box>
    </>
  );
}

export default UserWithoutLogin;
