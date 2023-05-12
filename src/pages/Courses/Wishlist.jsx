import { CardMedia, Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../../components/CartCourses/CartCard";
import { manipulateCart } from "../../Redux/AddToCart/Cart-Action";
import { ADD_ITEM, REMOVE_ITEM } from "../../Redux/AddToCart/Cart-Constants";
import { manipulateWishList } from "../../Redux/AddToWishlist/Wishlist-Action";
import {
  ADD_ITEM_IN_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
} from "../../Redux/AddToWishlist/Wishlist-Constants";
import bannerImage from "../../assets/CourseImages/SideBanner.png";
import { coursesAPI } from "../../api/requests/coursesApi";

const WishList = () => {
  const drawerWidth = 240;
  

  const CartLength = useSelector((state) => state.CartReducer.cartItems);
  const WishlistItems = useSelector(
    (state) => state.WishlistReducer.wishlistItems
  );
  const dispatch = useDispatch();

  const handleRemoveWishlist = async (item) => {
      await coursesAPI.removeFromWishList(item.id)
      .then((res)=>{
        dispatch(manipulateWishList(REMOVE_ITEM_FROM_WISHLIST, item?.id));
      })
      .catch((err)=>{})
  };
  const handleMoveToCart = (item) => {
    dispatch(manipulateWishList(REMOVE_ITEM_FROM_WISHLIST, item?.id));
    addCourseTocart(item);
  };
  const addCourseTocart = async (item) => {
    await coursesAPI.addCourseToWishListOrCart("CART", item.id)
      .then((res) => {
        getCourseFromCart();
      })
      .catch((err) => {});
  };

  const getCourseFromCart = async () => {
    await coursesAPI.getCourses("CART")
      .then((res) => {
        res.map((item) => {
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

  const handleRemoveItem = async (item) => {
    await coursesAPI.removeCourseFromCart(item.id)
      .then((res) => {
        dispatch(manipulateCart(REMOVE_ITEM, item?.id));
      })
      .catch((err) => {
      });
  };

  const handleMoveToWishlist = (item) => {
    dispatch(manipulateCart(REMOVE_ITEM, item?.id));
    addCourseToWishlistApi(item);
  };

  const addCourseToWishlistApi = async (item) => {
    await coursesAPI.addCourseToWishListOrCart("WISHLIST", item.id)
      .then((res) => {
        getAllWishlistCourses();
      })
      .catch((err) => {});
  };

  const getAllWishlistCourses = async () => {
    await coursesAPI.getCourses("WISHLIST")
      .then((res) => {
        res?.map((item) => {
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
  };

  return (
    <>
      <Grid
        container
        sx={{
          flexGrow: 1,
          p: { xs: "16px 0px 0px 0px", sm: 2 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: "100%",
        }}
      >
        <Grid container spacing={2} sx={{ mt: "1px" }}>
          <Grid item xs={12} md={8} sx={{ paddingTop: "0px!important" }}>
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

            <Toolbar />
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
          </Grid>
          <Grid item xs={12} md={4} sx={{ paddingTop: "0px!important" }}>
            <CardMedia
              sx={{ border: "1px solid #F0EFF2", padding: "16px 16px",height:{xs:"400px",md:"98%"} }}
              component="img"
              alt="green iguana"
              
              image={bannerImage}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default WishList;