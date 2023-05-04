import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from "@mui/material/Rating";
import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { manipulateCart } from "../../Redux/AddToCart/Cart-Action";
import { ADD_ITEM, REMOVE_ITEM } from "../../Redux/AddToCart/Cart-Constants";
import { useNavigate } from "react-router-dom";
import { manipulateWishList } from "../../Redux/AddToWishlist/Wishlist-Action";
import {
  ADD_ITEM_IN_WISHLIST,
  REMOVE_ITEM_FROM_WISHLIST,
} from "../../Redux/AddToWishlist/Wishlist-Constants";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { getCartCourses, getWishlistCourses } from "../../Config/Apis";
import { StarBorder } from "@mui/icons-material";
import { manipulateEditCourse } from "../../Redux/EditCourse/EditCourse-Action";
import {
  ADD_EDIT_COURSE,
  REMOVE_EDITABLE_COURSE,
} from "../../Redux/EditCourse/EditCourse-Constants";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";
import defaultImage from "../../assets/BannerImages/Thumbnail.png";
const CarouselItem = ({
  ProductDetails,
  index,
  keyfrombackend,
  loading,
  isEditable,
  isUserProfileInProduct
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGoToCartVisible, setIsGoToCartVisible] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.CartReducer.cartItems);
  const wishlistItems = useSelector(
    (state) => state.WishlistReducer.wishlistItems
  );
  const Token = localStorage.getItem("Token");
  const config = {
    headers: {
      Authorization: `bearer ${Token}`,
    },
  };

  useEffect(() => {
    if (cartItems?.filter((item) => item.id === ProductDetails.id).length) {
      setIsGoToCartVisible(true);
    } else {
      setIsGoToCartVisible(false);
    }
  }, [cartItems]);

  useEffect(() => {
    if (wishlistItems?.filter((item) => item.id === ProductDetails.id).length) {
      setIsWishlisted(true);
    } else {
      setIsWishlisted(false);
    }
  }, [wishlistItems]);

  const addCourseToWishlistApi = async (ProductDetails) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}course/stage/${ProductDetails.id}`,
        { stage: "WISHLIST" },
        config
      )
      .then((res) => {
        getAllWishlistCourses();
      })
      .catch((err) => {});
  };

  const addCourseToWishlistWithCondition = async (ProductDetails) => {
    if (cartItems?.filter((item) => item.id === ProductDetails.id).length) {
      setOpen(true);
    } else {
      addCourseToWishlistApi(ProductDetails);
    }
  };

  const getAllWishlistCourses = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}courses/stage/WISHLIST`, config)
      .then((res) => {
        res?.data?.map((item) => {
          if (
            wishlistItems?.filter((wishlistItem) => wishlistItem.id === item.id)
              .length
          ) {
          } else {
            dispatch(manipulateWishList(ADD_ITEM_IN_WISHLIST, item));
          }
        });
      })
      .catch((err) => {});
  };

  const addCourseTocartWithCondition = async (ProductDetails) => {
    if (wishlistItems?.filter((item) => item.id === ProductDetails.id).length) {
      addCourseTocart(ProductDetails);
      dispatch(
        manipulateWishList(REMOVE_ITEM_FROM_WISHLIST, ProductDetails.id)
      );
    } else {
      addCourseTocart(ProductDetails);
    }
  };

  const addCourseTocart = async (ProductDetails) => {
    await axios
      .post(
        `${process.env.REACT_APP_URL}course/stage/${ProductDetails.id}`,
        { stage: "CART" },
        config
      )
      .then((res) => {
        getCourseFromCart();
      })
      .catch((err) => {});
  };

  const getCourseFromCart = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}courses/stage/CART`, config)

      .then((res) => {
        res.data.map((item) => {
          if (
            cartItems?.filter((cartItems) => cartItems.id === item.id).length
          ) {
          } else {
            dispatch(manipulateCart(ADD_ITEM, item));
          }
        });
      })
      .catch((err) => {});
  };

  const handleRemoveItem = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_URL}course/stage/${id}`, config)
      .then((res) => {})
      .catch((err) => {
        dispatch(manipulateCart(REMOVE_ITEM, id));
      });
  };

  const handleRemoveWishlist = async (ProductDetails) => {
    await axios
      .delete(
        `${process.env.REACT_APP_URL}course/stage/${ProductDetails.id}`,
        config
      )
      .then((res) => {})
      .catch((err) => {
        dispatch(
          manipulateWishList(REMOVE_ITEM_FROM_WISHLIST, ProductDetails.id)
        );
      });
  };

  const handleGoTOCart = () => {
    navigate("/my-cart");
  };

  const handleMoveToWishlist = (ProductDetails) => {
    setIsHovered(false);
    addCourseToWishlistApi(ProductDetails);
    dispatch(manipulateCart(REMOVE_ITEM, ProductDetails.id));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);

    navigate("/my-cart");
  };

  const handleGoToDetailPage = (id) => {
    if(ProductDetails?.status==="UNDERREVIEW"){
      navigate("/under-review")
    }else if(ProductDetails?.status==="APPROVED"){
      navigate(`/coursevideos/${id}`);
    }
  };

  const handleEditCourse = (ProductDetails) => {
    dispatch(manipulateEditCourse(ADD_EDIT_COURSE, ProductDetails?.id));
  };

  const ALERT_TIME = 5000;
  const handlealert = (text, type) => {
    dispatch(
      manipulateuserdata(SET_ALERT_DATA, {
        text: text,
        type: type,
      })
    );
    setTimeout(() => {
      dispatch(manipulateuserdata(SET_ALERT_DATA, { text: "", type: "" }));
    }, ALERT_TIME);
  };

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => [setOpenDeleteDialog(false)];

  const handleDeleteCourse = async (ProductDetails) => {
    await axios
      .delete(`${process.env.REACT_APP_URL}course/${ProductDetails.id}`, config)
      .then((res) => {
        dispatch(manipulateWishList(REMOVE_EDITABLE_COURSE, ProductDetails.id));
        handlealert(res?.data?.message, "success");
        setOpenDeleteDialog(false);
      })
      .catch((err) => {
        handlealert(err?.data?.message, "error");
      });
  };
  return (
    <>
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="container-carousel-item"
        key={keyfrombackend}
      >
        <Box
          className="overlay_container"
          sx={{
            py: "12px",
            px: "12px",
            backgroundColor: "#fff",
            mx: "8px",
            my: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.10)",
          }}
        >
          {loading ? (
            <Skeleton variant="rectangular" width={210} height={118} />
          ) : (
            <img
              style={{
                width: "100%",
                height: 118,
                objectFit: "cover",
              }}
              alt={ProductDetails?.title}
              src={ProductDetails?.imageUrl}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = defaultImage;
              }}
            />
          )}
          {ProductDetails ? (
            <>
              <Box
                className="product-details"
                sx={{
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box className="product-sub-details">
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{
                        fontWeight: "700",
                        display: "-webkit-box!important",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitBoxOrient: " vertical",
                      }}
                    >
                      {ProductDetails.title}
                    </Typography>
                    <Typography
                      display="block"
                      variant="caption"
                      color="text.secondary"
                    >
                      {`${ProductDetails?.authorData?.firstName} ${ProductDetails?.authorData?.lastName}`}
                    </Typography>
                    {isUserProfileInProduct===true? <Typography
                      display="block"
                      variant="caption"
                      color="text.secondary"
                    >
                      {ProductDetails?.status}
                    </Typography>: <></>}
                  </Box>

                  <Box
                    sx={{
                      mt: 0.5,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ mr: 0.5, fontWeight: "500" }}
                        variant="caption"
                        color="#faaf00"
                      >
                        {ProductDetails?.rating?.rating}
                      </Typography>
                      <Stack spacing={1} sx={{ mr: 0.5 }}>
                        <Rating
                          sx={{ fontSize: "12px" }}
                          name="half-rating"
                          defaultValue={ProductDetails?.rating?.rating}
                          precision={1}
                          readOnly
                        />
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {` (${ProductDetails?.rating?.ratedBy})`}
                      </Typography>
                    </Box>

                    {isEditable ? null : (
                      <>
                        {isWishlisted ? (
                          <Box
                            onClick={() => handleRemoveWishlist(ProductDetails)}
                            sx={{
                              margin: 0,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FavoriteIcon
                              sx={{
                                fontSize: "16px",
                                lineHeight: "16px",
                                color: "pink",
                              }}
                            />
                          </Box>
                        ) : (
                          <Box
                            onClick={() =>
                              addCourseToWishlistWithCondition(ProductDetails)
                            }
                            sx={{
                              margin: 0,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FavoriteBorderIcon
                              sx={{
                                fontSize: "16px",
                                lineHeight: "16px",
                                color: "pink",
                              }}
                            />
                          </Box>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "700" }}>
                  ₹ {ProductDetails?.price}
                </Typography>
              </Box>
            </>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
        {isHovered && (
          // <>
          <div className="hover">
            {/* your hover things will be here */}
            <Box
              className="video_content_container"
              style={{
                backgroundColor: "#00000095",
                backdropFilter: "blur(10px)",
                color: "#fff",
                key: { index },
                // width: 210, height: 118,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="caption">
                  {ProductDetails?.techStack}
                </Typography>

                <List
                  sx={{ width: "100%", maxWidth: 300, pt: "0px" }}
                  aria-label="contacts"
                >
                  {ProductDetails?.keyPoints?.map((item, index2) => (
                    <ListItem disablePadding key={index2}>
                      <ListItemButton sx={{ padding: "0px" }}>
                        <ListItemIcon sx={{ width: "auto" }}>
                          <StarIcon sx={{ fontSize: "12px", color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          sx={{ wordBreak: "break-word" }}
                          primaryTypographyProps={{ fontSize: "13px" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontWeight: "300",
                    display: "-webkit-box!important",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: " vertical",
                  }}
                >
                  {ProductDetails?.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ mr: 0.5, fontWeight: "500" }}
                    variant="caption"
                    color="#faaf00"
                  >
                    {ProductDetails?.rating?.rating}
                  </Typography>
                  <Stack spacing={1} sx={{ mr: 0.5 }}>
                    <Rating
                      sx={{ fontSize: "12px", outlineColor: "#fff" }}
                      name="half-rating"
                      defaultValue={ProductDetails?.rating?.rating}
                      precision={1}
                      readOnly
                      emptyIcon={
                        <StarBorder fontSize="inherit" sx={{ color: "#fff" }} />
                      }
                    />
                  </Stack>
                  <Typography variant="caption" color="#fff">
                    {` (${ProductDetails?.rating?.ratedBy})`}
                  </Typography>
                </Box>
                <Typography variant="overline" className="value" sx={{ mr: 1 }}>
                  {`Total Videos ${ProductDetails?.videosCount}`}
                </Typography>
                <Typography variant="overline">
                  {`Total Sections ${ProductDetails?.sectionsCount}`}
                </Typography>
              </Box>
              <Box>
                {isEditable ? (
                  <Box display={"flex"} flexDirection="column" gap="16px">
                    <Box display={"flex"} gap="16px">
                      <Button
                        fullWidth
                        sx={{ fontSize: "11px", fontWeight: "400" }}
                        variant="contained"
                        onClick={() => {
                          handleEditCourse(ProductDetails);
                          navigate(`/course-update/${ProductDetails.id}`);
                        }}
                      >
                        Edit Course
                      </Button>
                      <Button
                        fullWidth
                        sx={{ fontSize: "11px", fontWeight: "400" }}
                        variant="outlined"
                        onClick={() => {
                          handleDeleteDialog(ProductDetails);
                        }}
                      >
                        Delete Course
                      </Button>
                    </Box>
                    <Button
                      fullWidth
                      sx={{ fontSize: "11px", fontWeight: "400" }}
                      variant="contained"
                      onClick={() => handleGoToDetailPage(ProductDetails?.id)}
                    >
                      View Course
                    </Button>
                  </Box>
                ) : (
                  <Grid container sx={{ mt: 2, alignItems: "center" }}>
                    <Grid
                      item
                      xs={5}
                      display="flex"
                      justifyContent="left"
                      alignItems="center"
                      sx={{ mr: 1 }}
                    >
                      {isGoToCartVisible ? (
                        <Button
                          fullWidth
                          sx={{ fontSize: "11px", fontWeight: "400" }}
                          variant="contained"
                          onClick={handleGoTOCart}
                        >
                          Go to Cart
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          sx={{ fontSize: "11px", fontWeight: "400" }}
                          variant="contained"
                          onClick={() => {
                            //  addCourseTocart(ProductDetails);
                            addCourseTocartWithCondition(ProductDetails);
                          }}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={5}
                      display="flex"
                      justifyContent="right"
                      alignItems="center"
                      sx={{ ml: 1 }}
                    >
                      <Button
                        fullWidth
                        sx={{ fontSize: "11px", fontWeight: "400" }}
                        variant="outlined"
                        onClick={() => handleGoToDetailPage(ProductDetails?.id)}
                      >
                        View Details
                      </Button>
                    </Grid>
                    {isWishlisted ? (
                      <Box
                        onClick={() => handleRemoveWishlist(ProductDetails)}
                        sx={{
                          margin: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FavoriteIcon
                          sx={{
                            fontSize: "16px",
                            lineHeight: "16px",
                            color: "pink",
                          }}
                        />
                      </Box>
                    ) : (
                      <Box
                        onClick={() => {
                          addCourseToWishlistWithCondition(ProductDetails);
                        }}
                        sx={{
                          margin: 1,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FavoriteBorderIcon
                          sx={{
                            fontSize: "16px",
                            lineHeight: "16px",
                            color: "pink",
                          }}
                        />
                      </Box>
                    )}
                  </Grid>
                )}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <DialogTitle id="alert-dialog-title">
                    {"item in cart?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      this Item in cart do you really want to move in wishlist
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => handleMoveToWishlist(ProductDetails)}
                    >
                      Yes
                    </Button>
                    <Button onClick={handleClose}>Go to cart</Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openDeleteDialog}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Do you really want to delete?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      this course will delete permanently
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => handleDeleteCourse(ProductDetails)}>
                      Yes
                    </Button>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Box>
          </div>
          // </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 220px;
  margin: 50px 0px;
  width: 220px;
  height: 220px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  &:hover {
    max-width: 20rem;
    width: 20rem;
  }
  .hover {
    z-index: 9000;
    height: 20rem;
    width: 20rem;
    position: absolute;
    top: -20%;
    left: 0;
    border-radius: 0.3rem;
    background-color: #18181890;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    transition: 0.3s ease-in-out;
    &:hover {
      max-width: 20rem;
      width: 20rem;
    }
  }
  .video_content_container {
    position: relative;
    height: 20rem;
    padding: 1rem;
    padding-bottom: 20px;
  }
`;

export default React.memo(CarouselItem);
