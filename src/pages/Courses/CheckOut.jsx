import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import ShipingDetails from "../../components/CheckOut";
import OrderList from "../../components/CheckOut/OrderList";
import Skeletons from "../../components/Skeleton/Skeletons";
import { getCartCourses, getPrice } from "../../Config/Apis";

const CheckOut = () => {
  const drawerWidth = 240;
  const [yourOrder, setYourOrder] = useState([]);
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(true);

  const Token = localStorage.getItem("Token");

  const config = {
    headers: {
      Authorization: `bearer ${Token}`,
    },
  };

  useEffect(() => {
    getCourseFromCart();
  }, []);

  const getCourseFromCart = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_URL}courses/stage/CART`, config)
      .then((res) => {
        setYourOrder(res?.data);
        setLoading(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPrices();
  }, []);

  const getPrices = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_URL}price`, config)
      .then((res) => {
        setPrice(res?.data?.price);
      })
      .catch((err) => {});
  };

  return (
    <>
      {/* <SideBarResponsive /> */}
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          p: {xs:0,md:0,lg:4},
          m: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
            <Skeletons type="CircularLoad" />
          </Box>
        ) : (
          <>
            <ShipingDetails price={price} />
            <OrderList yourOrder={yourOrder} price={price} />
          </>
        )}
      </Grid>
    </>
  );
};
export default CheckOut;
