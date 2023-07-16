import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Grid, Toolbar, Typography } from "@mui/material";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import TaskIcon from "@mui/icons-material/Task";
import ProfileCard from "./ProfileCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { manipulateCart } from "../../Redux/AddToCart/Cart-Action";
import { ADD_ITEM } from "../../Redux/AddToCart/Cart-Constants";
import { useEffect } from "react";
import { manipulateWishList } from "../../Redux/AddToWishlist/Wishlist-Action";
import { ADD_ITEM_IN_WISHLIST } from "../../Redux/AddToWishlist/Wishlist-Constants";
import Skeletons from "../Skeleton/Skeletons";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import GroupsIcon from "@mui/icons-material/Groups";
import LoginIcon from "@mui/icons-material/Login";
import { courseStageAPI } from "../../api/requests/courses/courseStageAPI";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import jwt_decode from "jwt-decode";
import { gapi } from "gapi-script";
import LinearProgressWithLabelReusable from "../LinearProgress/LinearProgressWithLabelReusable";
import { LegendToggleOutlined } from "@mui/icons-material";
import { useState } from "react";
import GetValidatedTokenData from "../../utils/helper";

const drawerWidth = 240;

function SideBarResponsive(props, { type }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profile, setProfile] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [decoded, setDecoded] = React.useState("");

  const CartLength = useSelector((state) => state?.CartReducer?.cartItems);
  const wishlistItems = useSelector(
    (state) => state?.WishlistReducer?.wishlistItems
  );
  const cartItem = useSelector((state) => state?.CartReducer?.cartItems);
  // const Username = localStorage.getItem("Username");

  const location = useLocation();

  // Check if current route is contest page
  let showAppBar = null;
  const isContestPage = location.pathname === "/contest";
  // let showAppBar = location.pathname.includes( "/contest");
  let isCoursePage = location.pathname.includes("/coursevideos");

  if (location.pathname.includes("/contest")) {
    showAppBar = true;
  } else if (location.pathname.includes("coursevideos")) {
    showAppBar = true;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    getCourseFromCart();
  }, []);

  // useEffect(() => {
  //   const pathName = location.pathname;
  //   if (pathName === "/") {
  //     handleListItemClick(null, 1);
  //   } else if (pathName === "/contest") {
  //     handleListItemClick(null, 2);
  //   } else if (pathName === "/my-cart") {
  //     handleListItemClick(null, 3);
  //   } else if (pathName === "/my-courses") {
  //     handleListItemClick(null, 4);
  //   } else if (pathName === "/wishlist") {
  //     handleListItemClick(null, 5);
  //   } else if (pathName === "/create-course") {
  //     handleListItemClick(null, 6);
  //   } else if (pathName === "/admin/contest") {
  //     handleListItemClick(null, 7);
  //   } else if (pathName === "/user-profile") {
  //     handleListItemClick(null, 8);
  //   }
  // }, []);

  useEffect(() => {
    getAllWishlistCourses();
  }, []);

  const Token = localStorage.getItem("Token");

  // Decoding the User Name
  const decodeUsername = GetValidatedTokenData();
  const Username = decodeUsername.username;

  const getCourseFromCart = async () => {
    await courseStageAPI
      .getCourses("CART")
      .then((data) => {
        data?.map((item) => {
          if (
            cartItem?.filter((cartItems) => cartItems.id === item.id).length
          ) {
          } else {
            dispatch(manipulateCart(ADD_ITEM, item));
          }
        });
      })
      .catch((err) => {});
  };

  const getAllWishlistCourses = async () => {
    await courseStageAPI
      .getCourses("WISHLIST")
      .then((data) => {
        data?.map((item) => {
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    const auth2 = gapi.auth2?.getAuthInstance();

    if (auth2 != null) {
      auth2.signOut().then(auth2.disconnect().then());
    }
    navigate("/sign-in", { replace: true });
  };
  let pages = [
    {
      name: "Home",
      path: "/",
      icon: <HomeOutlinedIcon sx={{ fontSize: { uxl: "28px" } }} />,
    },
    {
      name: "Contest",
      path: "/contest",
      icon: <EmojiEventsOutlinedIcon sx={{ fontSize: { uxl: "28px" } }} />,
    },
    {
      name: "My cart",
      path: "/my-cart",
      icon: <ShoppingCartOutlinedIcon sx={{ fontSize: { uxl: "28px" } }} />,
      badgeContent: CartLength.length,
    },
    {
      name: "My Courses",
      path: "/my-courses",
      icon: <ImportContactsOutlinedIcon sx={{ fontSize: { uxl: "28px" } }} />,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <FavoriteBorderOutlinedIcon sx={{ fontSize: { uxl: "28px" } }} />,
      badgeContent: wishlistItems.length,
    },
    {
      name: "Task",
      path: "/task",
      icon: <TaskIcon sx={{ fontSize: { uxl: "28px" } }} />,
    },
    {
      name: "Create Course",
      path: "/create-course",
      icon: <CreateNewFolderIcon sx={{ fontSize: { uxl: "28px" } }} />,
    },
  ];
  if (decoded === "") {
     const data = GetValidatedTokenData();
    {data && setDecoded(data)}
  }
  if (decoded.role == "ADMIN" || decoded.role == "SUPERADMIN") {
    pages.push({
      name: "Create Contest",
      path: "/admin/contest",
      icon: <GroupsIcon sx={{ fontSize: { uxl: "28px" } }} />,
    });
  }

  const navigate = useNavigate();

  const handleNavigate = (e, path) => {
    e.preventDefault();
    navigate(`${path}`);
  };

  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  const drawer = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div>
        <List style={{ padding: "16px 16px " }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "700", cursor: "pointer" }}
            onClick={(event) => {
              navigate("/");
            }}
          >
            OptiGrit
          </Typography>
        </List>
        <Divider />
        {Token ? (
          <List>
            {loading ? (
              <Box
                sx={{ display: "flex", flexDirection: "column" }}
                className="mainSkeletonContainer"
              >
                <Skeletons type="sideBar" />
              </Box>
            ) : (
              <>
                {pages.map((page, index) => (
                  <ListItemButton
                    key={index}
                    selected={location.pathname === page.path}
                    onClick={(e) => handleNavigate(e, page.path)}
                  >
                    {page.badgeContent ? (
                      <ListItemIcon>
                        <Badge badgeContent={page.badgeContent} color="primary">
                          {page.icon}
                        </Badge>
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon>{page.icon}</ListItemIcon>
                    )}
                    <ListItemText
                      primary={page.name}
                      primaryTypographyProps={{ fontSize: { uxl: "20px" } }}
                    />
                  </ListItemButton>
                ))}
              </>
            )}
          </List>
        ) : null}
        <Divider />
      </div>
      <div>
        <Divider />
        {Token ? (
          <List>
            {loading ? (
              <Box
                sx={{ display: "flex", flexDirection: "column" }}
                className="mainSkeletonContainer"
              >
                <Skeletons type="sideBarBottom" />
              </Box>
            ) : (
              <>
                <ListItemButton
                  selected={location.pathname === "/user-profile"}
                  onClick={(event) => {
                    navigate("/user-profile");
                  }}
                  sx={{ padding: "0px" }}
                  key={8}
                >
                  <ProfileCard Name={truncate(Username, 13)} />
                </ListItemButton>
                {/* <ListItemButton
                selected={selectedItem === 9}
                onClick={(event) => handleListItemClick(event, 9)}
                key={9}
              >
                <ListItemIcon>
                  <SettingsOutlinedIcon sx={{ fontSize: { uxl: "28px" } }} />
                </ListItemIcon>
                <ListItemText
                  primary="Account"
                  primaryTypographyProps={{ fontSize: { uxl: "20px" } }}
                />
              </ListItemButton> */}
                <ListItemButton
                  selected={location.pathname === "/sign-in"}
                  onClick={(event) => {
                    handleLogout();
                  }}
                  key={10}
                >
                  <ListItemIcon>
                    <LogoutOutlinedIcon sx={{ fontSize: { uxl: "28px" } }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ fontSize: { uxl: "20px" } }}
                  />
                </ListItemButton>
              </>
            )}
          </List>
        ) : (
          <List>
            <ListItemButton
              selected={location.pathname === "/sign-in"}
              onClick={(event) => {
                navigate("/sign-in");
              }}
              key={1}
            >
              <ListItemIcon>
                <LoginIcon sx={{ fontSize: { uxl: "28px" } }} />
              </ListItemIcon>
              <ListItemText
                primary="Login"
                primaryTypographyProps={{ fontSize: { uxl: "20px" } }}
              />
            </ListItemButton>
          </List>
        )}
      </div>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="SideBar">
      <Box
        sx={{
          display: {
            xs: "initial",
            sm: isCoursePage ? "none" : "initial",
            md: isCoursePage ? "none" : "initial",
            lg: isCoursePage ? "none" : "initial",
            xl: isCoursePage ? "none" : "initial",
          },
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#ffffff",
            color: "#000",
            // boxShadow: "0px 1px 10px rgba(0, 0, 0, 0.1);",
            borderBottom: {
              xs: isCoursePage ? "1px solid rgba(53, 65, 80, 0.1);" : "none",
            },
            boxShadow: {
              xs: isCoursePage ? "none" : " 0px 1px 10px rgba(0, 0, 0, 0.1);",
            },
            width: {
              sm: showAppBar ? "100%" : `calc(100% - ${drawerWidth}px)`,
              md: showAppBar ? "100%" : `calc(100% - ${drawerWidth}px)`,
              // lg: isCoursePage ? `calc(100% - ${drawerWidth}px)`:"100%",
            },
            ml: { sm: showAppBar ? "0px" : `${drawerWidth}px` },
          }}
        >
          <Toolbar
            sx={{
              display: {
                md: "none",
                lg: isCoursePage ? "flex" : "none",
                sm: showAppBar ? "flex" : "none",
                md: showAppBar ? "flex" : "none",
                justifyContent: "space-between",
              },
              minHeight: { sm: "56px!important" },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: {
                  sm: isContestPage ? "block" : "none",
                  md: isContestPage ? "block" : "none",
                },
                justifyContent: "left",
                ml: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "500",
                  cursor: "pointer",
                  fontSize: "18px",
                  lineHeight: "18px",
                  marginRight: "2rem",
                }}
                onClick={(event) => {
                  navigate("/");
                }}
              >
                OptiGrit
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            maxHeight: { sm: isCoursePage ? "56px" : "56px" },
          }}
          aria-label="mailbox folders"
        >
          <Toolbar
            sx={{
              display: {
                md: showAppBar ? "block" : "none",
                lg: isCoursePage ? "block" : "none",
                sm: showAppBar ? "block" : "none",
                maxHeight: { lg: isCoursePage ? "56px" : "" },
              },
            }}
          />

          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {
                xs: "block",
                sm: showAppBar ? "block" : "none",
                md: showAppBar ? "block" : "none",
              },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: {
                xs: "none",
                sm: showAppBar ? "none" : "block",
                lg: showAppBar ? "block" : "block",
                lg: isCoursePage ? "none" : "block",
              },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: { sm: drawerWidth, uxl: 350 },
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </div>
  );
}

SideBarResponsive.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBarResponsive;
