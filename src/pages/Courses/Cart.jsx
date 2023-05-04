import { Box, Grid, Toolbar } from "@mui/material";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../../components/CartCourses/CartCard";
import TotalCart from "../../components/CartCourses/Total-Cart";
import Skeletons from "../../components/Skeleton/Skeletons";
import { manipulateCart } from "../../Redux/AddToCart/Cart-Action";
import { ADD_ITEM, REMOVE_ITEM } from "../../Redux/AddToCart/Cart-Constants";
import { manipulateWishList } from "../../Redux/AddToWishlist/Wishlist-Action";
import {
  ADD_ITEM_IN_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
} from "../../Redux/AddToWishlist/Wishlist-Constants";

const Cart = () => {
  const drawerWidth = 240;

  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(null);

  const CartLength = useSelector((state) => state.CartReducer.cartItems);
  const WishlistItems = useSelector(
    (state) => state.WishlistReducer.wishlistItems
  );
  const Token = localStorage.getItem("Token");

  const config = {
    headers: {
      Authorization: `bearer ${Token}`,
    },
  };

  const getCourseFromCart = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_URL}courses/stage/CART`, config)
      .then((res) => {
        setLoading(false);
        res.data.map((item) => {
          if (
            CartLength?.filter((cartItems) => cartItems.id === item.id).length
          ) {
          } else {
            dispatch(manipulateCart(ADD_ITEM, item));
          }
        });
      })
      .catch((err) => {});
  };

  const dispatch = useDispatch();
  const handleRemoveWishlist = async (item) => {
    await axios
      .delete(`${process.env.REACT_APP_URL}course/stage/${item.id}`, config)
      .then((res) => {
        dispatch(manipulateWishList(REMOVE_ITEM_FROM_WISHLIST, item?.id));
      })
      .catch((err) => {
      });
  };

  const handleMoveToWishlist = (item) => {
    dispatch(manipulateCart(REMOVE_ITEM, item?.id));
    addCourseToWishlistApi(item);
  };

  const addCourseToWishlistApi = async (item) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}course/stage/${item?.id}`,
        { stage: "WISHLIST" },
        config
      )
      .then((res) => {
        getAllWishlistCourses();
      })
      .catch((err) => {});
  };

  const getAllWishlistCourses = async () => {
    // setLoading(true)
    await axios
      .get(`${process.env.REACT_APP_URL}courses/stage/WISHLIST`, config)
      .then((res) => {
        res?.data?.map((item) => {
          if (
            WishlistItems?.filter(
              (wishlistItem) => wishlistItem?.id === item.id
            ).length
          ) {
          } else {
            dispatch(manipulateWishList(ADD_ITEM_IN_WISHLIST, item));
          }
        });
      })
      .catch((err) => {});
    // setLoading(false)
  };

  const handleRemoveItem = async (item) => {
    await axios
      .delete(`${process.env.REACT_APP_URL}course/stage/${item?.id}`, config)
      .then((res) => {
        dispatch(manipulateCart(REMOVE_ITEM, item?.id));
      })
      .catch((err) => {
      });
  };

  const handleMoveToCart = (item) => {
    dispatch(manipulateWishList(REMOVE_ITEM_FROM_WISHLIST, item?.id));
    addCourseTocart(item);
  };
  const addCourseTocart = async (item) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}course/stage/${item?.id}`,
        { stage: "CART" },
        config
      )
      .then((res) => {
        getCourseFromCart();
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPrices();
  }, [CartLength]);

  const getPrices = async () => {
    setLoading(true);

    await axios
      .get(`${process.env.REACT_APP_URL}price`, config)
      .then((res) => {
        setLoading(false);
        setPrice(res?.data?.price);
      })
      .catch((err) => {});
  };
  return (
    <>
      <Grid container
        sx={{
          flexGrow: 1,
          p: { xs: "16px 0px 0px 0px", sm: 2 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: "100%",
        }}
      >
        {loading ? (
          <Box
            sx={{ display: "flex", width: "100%", height: "100vh" }}
            className="aa"
          >
            <Skeletons type="CircularLoad" />
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ mt: "1px", height: "100vh" }}>
            <Grid item xs={12} md={8} sx={{ paddingTop: "0px!important" }}>
              <CartCard
                ItemDetails={CartLength}
                title={"Items in cart "}
                btnTitle={"Move to WishList"}
                TitleForEmptyCartOrWhislist={
                  "Your cart is empty. Keep shopping to find a course!"
                }
                handleClickRemove={handleRemoveItem}
                handleClickMoveTo={handleMoveToWishlist}
              />

              <Toolbar />
              <CartCard
                ItemDetails={WishlistItems}
                title={"Items in Wishlist "}
                btnTitle={"Move to Cart"}
                TitleForEmptyCartOrWhislist={
                  "Your Wishlist is empty. Keep shopping to find a course!"
                }
                handleClickRemove={handleRemoveWishlist}
                handleClickMoveTo={handleMoveToCart}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                paddingTop: "0px!important",

                backgroundColor: "#fff ",
              }}
            >
              <TotalCart title={"Total"} price={price} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default memo(Cart);
