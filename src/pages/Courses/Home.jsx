import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Carousel1 from "../../components/CarouselForBanner/index";
import Product from "../../components/ProductCarousel/Product";
import Filter from "../../components/Filter";
import axios from "axios";
import Image2 from "../../assets/CourseImages/Banner1.png";
import Image3 from "../../assets/BannerImages/Banner2.png";
const Home = () => {
  const drawerWidth = 240;
  const BannerData = [Image2, Image3];

  const [data2, setData2] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterItems, setFilterItems] = useState(data2);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filterSelectedItem, setFilterSelectedItem] = useState(filterItems);
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

  const handleClickCategory = (event) => {
    setFilteredCategory(event.target.name);
  };

  const filteredItems = () => {
    let Highest = data2?.filter((item) => {
      return item.ratings > 4;
    });
    setHighest([...Highest]);
  };

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}courses/1`,
          config
        );
        setData2(res?.data);

        setLoading(false);
      } catch (err) {}
    };
    data();
  }, []);
  const handleReset = () => {
    setFilterItems(data2);
    setSearchKeyword("");
  };

  const handleSearchFromApi = async () => {
    setSearchLoad(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}courses/1?search=${searchKeyword}`,
        config
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: { lg: `calc(100%)` },
            margin: "auto",
            minWidth: { lg: "978px" },
            maxWidth: { xl: "1640px" },
          }}
        >
          <Carousel1 BannerImages={BannerData} lgHeight={"400px"} />
          <Filter
            data={data2}
            handleSeach={onSearchChangeName}
            handleClickCategory={handleClickCategory}
            searchLoad={searchLoad}
            handleSearchFromApi={handleSearchFromApi}
            handleReset={handleReset}
            searchKeyword={searchKeyword}
          />
          <Product
            title={"Suggested Courses for you"}
            dataRender={data2}
            loading={loading}
          />

          <Product title={"Our Courses"} dataRender={filterItems} />
          {/* <Product title={"Highest Rated Courses"} dataRender={highest} /> */}
        </Box>
      </Box>

      {/* <Product title={"Title goes here"} dataRender={data} /> */}
      {/* // filteredCards={handleSeach} */}
      {/* <ReponsiveCarousel Title="new carousel" dataFromHome={data}/> */}
      {/* this props gone in to ProductCarousel then from ProductCarousel to ProductCard then it will be map on ProductCard page */}
      {/* <ReponsiveCarousel Title={"Title API"} dataFromHome={data}/>  */}
      {/* <ProductCarousel Title={"Title goes here"} dataFromHome={data}/> */}
      {/* <ProductCard title={"Title APIww"} dataRender={data} /> */}
    </>
  );
};

export default Home;
