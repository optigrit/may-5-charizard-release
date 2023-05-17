import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Paper,
  ButtonGroup,
  Button,
  TextField,
  MenuItem,
  Fab,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Avatar,
  Tooltip,
  Grid,
  Tabs,
  Tab,
  IconButton,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
} from "@mui/material";
import ReactPlayer from "react-player";
import SideBarResponsive from "../../components/SideBarResponsive/index";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";
import SortIcon from "@mui/icons-material/Sort";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import File from "../../assets/courseVideosUpload/FILE.svg";
import Reviews from "../../components/Reviews/Reviews";
import { useEffect } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Getcourses from "../../components/Getcourses/Getcourses";
import { useDispatch, useSelector } from "react-redux";
import { manipulateCart } from "../../Redux/AddToCart/Cart-Action";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { ADD_ITEM } from "../../Redux/AddToCart/Cart-Constants";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";
import { manipulateWishList } from "../../Redux/AddToWishlist/Wishlist-Action";
import { REMOVE_ITEM_FROM_WISHLIST } from "../../Redux/AddToWishlist/Wishlist-Constants";
// import Popper from '@mui/material/Popper';
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";
import { courseAPI } from "../../api/requests/courses/courseAPI";
import { courseVideoAPI } from "../../api/requests/courses/courseVideoAPI";
import { courseStageAPI } from "../../api/requests/courses/courseStageAPI";
import { courseCommentAPI } from "../../api/requests/courses/courseCommentAPI";
import { userAPI } from "../../api/requests/users/userAPI";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Coursevideo = () => {
  const [sort, setSort] = useState(false);
  const [dot, setDot] = useState(false);
  const [Id, setId] = useState(null);
  const [rid, setRid] = useState(null); // reply Id
  const [lid, setLid] = useState(null); //like Id
  const [did, setDid] = useState(null); //dislike Id
  const [rlid, setRlid] = useState(null); // reply like Id
  const [rdid, setRdid] = useState(null);
  const [editid, setEditid] = useState(null);
  const [commments, setCommments] = useState(false);
  const [usercommments, setUsercommments] = useState();
  const [reeply, setReeply] = useState(null);
  const [userreply, setUserreply] = useState();
  const [com, setCom] = useState(true);
  const [course, setCourse] = useState(false);
  const [review, setReview] = useState(false);
  const [reso, setReso] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(true);
  const [togglemenu, setTogglemenu] = useState(false);
  const [url, setUrl] = useState(0);
  const [hover, setHover] = useState(false);
  const [reshover, setReshover] = useState(true);
  const [buy, setBuy] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [more, setMore] = useState(false);
  const [editcomm, setEditcomm] = useState(false);
  const [openreply, setOpenreply] = useState(false);
  const [editcom, setEditcom] = useState();
  const [open, setOpen] = useState(false);
  const [reportdesc, setReportdesc] = useState(false);
  const [UserReport, setUserReport] = useState();
  const [reportid, setReportid] = useState();
  const [secindex, setSecindex] = useState(0);
  const [vidindex, setVidindex] = useState(0);
  const [vid, setVid] = useState(null);
  const [page, setPage] = useState(1);
  const [userprogresss, setUserprogresss] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentuser, setCurrentuser] = useState();
  const [totalcomments, setTotalcomments] = useState([]);
  const [totalreplies, setTotalreplies] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [coursedata, setCoursedata] = useState([]);
  const [authordata, setAuthordata] = useState([]);
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(false);
  const [errorrFetchedChecker, setErrorrFetchedChecker] = useState(false);
  const [stage, setStage] = useState(null);

  const navigate = useNavigate();

  const handleSort = () => {
    setSort(!sort);
  };
  const handleDot = (Id, i) => {
    setDot(!dot);
    setId(Id);
    setEditid(i);
    // setEditcom(null)
  };

  const [states, setStates] = useState({
    playing: false,
    duration: 0,
    playedTime: 0,
    playbackSpeed: 1,
    playedSeconds: 0,
    played: 0,
    loaded: 0,
    loadedSeconds: 0,
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDuration = (duration) => {
    const totalDuration = new Date(duration * 1000).toISOString().slice(14, 19);
    setStates({
      ...states,
      duration: totalDuration,
    });
  };

  const handlePlayback = (e) => {
    setStates({
      ...states,
      playbackSpeed: e,
    });
  };

  const handleEnd = () => {
    setStates({
      ...states,
      playing: false,
    });
  };
  const handleCom = () => {
    setCom(!com);
    setCourse(false);
    setReso(false);
    setReview(false);
  };
  const handleCourse = () => {
    setCourse(!course);
    setCom(false);
    setReso(false);
    setReview(false);
  };
  const handleReso = () => {
    setReso(!reso);
    setCourse(false);
    setCom(false);
    setReview(false);
  };
  const handleReviews = () => {
    setReview(!review);
    setCom(false);
    setCourse(false);
    setReso(false);
  };
  const anchorRefMenu = React.useRef(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleToggle = () => {
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  const handleClose = (event) => {
    if (anchorRefMenu.current && anchorRefMenu.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenu(false);
    } else if (event.key === "Escape") {
      setOpenMenu(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openMenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRefMenu.current.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const handleProgress = (state) => {
    const playedTime = state.playedSeconds;
    const playedSeconds = new Date(playedTime * 1000)
      .toISOString()
      .slice(14, 19);
    setStates({
      ...states,
      playedTime: playedTime,
      playedSeconds: playedSeconds,
      played: state.played,
      loaded: state.loaded,
    });
  };

  const { playing } = states;
  const MouseEntered = () => setHover(true);
  const MouseLeave = () => setHover(false);
  const MouseIn = () => setReshover(true);
  const MouseOut = () => setReshover(false);

  let { id } = useParams();
  const getdata = async () => {
    try {
      const data = await courseAPI.getSpecificCourse(id);
      return data;
    } catch (error) {}
  };

  const updateState = (data) => {
    setStage(data.data.courseStage);
    cartBtnText(data.data.courseStage);
    setAuthordata(data.data.authorData);
    setCoursedata(data.data.courseVideos);
    setUserdata(data.data.courseData);
    setUrl(data.data.courseVideos[0].videosData[0].videoUrl);
  };

  const userprogress = async () => {
    try {
      const data = await courseVideoAPI.updateUserProgress(id, {
        sectionId: coursedata[secindex]?.id,
        videoId: coursedata[secindex]?.videosData[vidindex]?.id,
      });
    } catch (err) {}
  };

  const getuserprogress = async () => {
    try {
      const data = await courseVideoAPI.getUserProgress(id);
      return data;
    } catch (err) {}
  };

  useEffect(() => {
    getdata().then(
      (data) => updateState(data),
      (error) => {
        alert("Data Fetching error");
        setErrorFetchedChecker((c) => !c);
      }
    );
    getuserprogress();
  }, [errorFetchedChecker]);

  const updateuserState = (data) => {
    setUserprogresss(data[0]);
    setVid(data[0].videoId);
  };

  useEffect(() => {
    getuserprogress().then(
      (data) => updateuserState(data),
      (error) => {
        alert("Data Fetching error");
        setErrorrFetchedChecker((c) => !c);
      }
    );
  }, [errorrFetchedChecker]);

  const cartItems = useSelector((state) => state.CartReducer.cartItems);
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state?.WishlistReducer?.wishlistItems
  );

  const addCourseTocart = async (userdata) => {
    await courseStageAPI
      .addCourseToWishListOrCart(id, "CART")
      .then((res) => {})
      .catch((err) => {});
  };

  const addCourseTocartWithCondition = async (userdata) => {
    if (stage === "CART") {
      navigate("/my-cart");
    } else if (stage === "BUYED") {
      setBuy(true);
    } else if (wishlistItems?.filter((item) => item.id === id).length) {
      dispatch(manipulateWishList(REMOVE_ITEM_FROM_WISHLIST, id));
      addCourseTocart(userdata);
      navigate("/my-cart");
    } else {
      addCourseTocart(userdata);
      navigate("/my-cart");
    }
  };
  const buycourse = async (userdata) => {
    if (cartItems?.filter((item) => item.id === id).length) {
    } else {
      addCourseTocart(userdata);
      navigate("/check-out");
    }
  };

  const getComments = async () => {
    try {
      const data = await courseCommentAPI.getComments(id, page);
      setComments(data.commentsData);
      setTotalcomments(parseInt(data.commentsCount));
    } catch (err) {}
  };

  const userinfo = async () => {
    try {
      const data = await userAPI.getUserInfo();
      setCurrentuser(data && data);
    } catch (err) {}
  };

  const addComment = async () => {
    try {
      const data = await courseCommentAPI.addComment(id, {
        comment: usercommments,
      });
      data[0].userData = currentuser;
      data[0].likes = 0;
      data[0].dislikes = 0;
      setTotalcomments((a) => a + 1);
      comments.unshift(data[0]);
      setComments([...comments]);
    } catch (err) {}
  };

  useEffect(() => {
    userinfo();
    getComments();
  }, [page]);

  const editComment = async () => {
    try {
      const data = await courseCommentAPI.editComment(Id, {
        newComment: editcom,
        commentId: Id,
      });
    } catch (err) {}
  };

  const deleteComment = async (i) => {
    try {
      const data = await courseCommentAPI.deleteComment(Id);
      comments.splice(i, 1);
      setTotalcomments((a) => a - 1);
      setComments([...comments]);
    } catch (err) {}
  };

  const giveLike = async (Id, isDisliked, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: "LIKE",
        commentId: Id,
      });
      if (isDisliked) {
        comments[i].likes = comments[i].likes + 1;
        comments[i].dislikes = comments[i].dislikes - 1;
        comments[i].isDisLiked = null;
        comments[i].isLiked = { id: Id };
      } else {
        comments[i].likes = comments[i].likes + 1;
        comments[i].isLiked = { id: Id };
      }
      setComments([...comments]);
    } catch (err) {}
  };

  const giveDislike = async (Id, isLikes, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: "DISLIKE",
        commentId: Id,
      });
      if (isLikes) {
        comments[i].dislikes = comments[i].dislikes + 1;
        comments[i].likes = comments[i].likes - 1;
        comments[i].isLiked = null;
        comments[i].isDisLiked = { id: Id };
      } else {
        comments[i].dislikes = comments[i].dislikes + 1;
        comments[i].isDisLiked = { id: Id };
      }
      setComments([...comments]);
    } catch (err) {}
  };

  const removeLike = async (Id, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: "REMOVELIKE",
        commentId: Id,
      });
      comments[i].likes = comments[i].likes - 1;
      comments[i].isLiked = null;
      setComments([...comments]);
    } catch (err) {}
  };

  const removeDislike = async (Id, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: "REMOVEDISLIKE",
        commentId: Id,
      });
      comments[i].dislikes = comments[i].dislikes - 1;
      comments[i].isDisLiked = null;
      setComments([...comments]);
    } catch (err) {}
  };

  const handleLike = (Id, isLikes, isDisliked, i) => {
    setLike(!like);
    setLid(Id);
    setDislike(false);
    if (!isLikes) {
      giveLike(Id, isDisliked, i);
    } else {
      removeLike(Id, i);
    }
  };
  
  const handleDislike = (Id, isLikes, isDisliked, i) => {
    setDislike(!dislike);
    setDid(Id);
    setLike(false);
    if (!isDisliked) {
      giveDislike(Id, isLikes, i);
    } else {
      removeDislike(Id, i);
    }
  };

  const getReply = async (Id) => {
    try {
      const data = await courseCommentAPI.getReply(id, page, Id);
      return data;
    } catch (err) {}
  };

  const giveReplyLikes = async (Id, isDisliked, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: "LIKE",
        commentId: Id,
      });
      if (isDisliked) {
        reeply[i].likes = reeply[i].likes + 1;
        reeply[i].dislikes = reeply[i].dislikes - 1;
        reeply[i].isDisLiked = null;
        reeply[i].isLiked = { id: Id };
      } else {
        reeply[i].likes = reeply[i].likes + 1;
        reeply[i].isLiked = { id: Id };
      }
      setReeply([...reeply]);
    } catch (err) {}
  };

  const giveReplyDislikes = async (Id, isLiked, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: "DISLIKE",
        commentId: Id,
      });
      if (isLiked) {
        reeply[i].dislikes = reeply[i].dislikes + 1;
        reeply[i].likes = reeply[i].likes - 1;
        reeply[i].isLiked = null;
        reeply[i].isDisLiked = { id: Id };
      } else {
        reeply[i].dislikes = reeply[i].dislikes + 1;
        reeply[i].isDisLiked = { id: Id };
      }
      setReeply([...reeply]);
    } catch (err) {}
  };

  const removeReplyLikes = async (Id, i) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: "REMOVELIKE",
        commentId: Id,
      });
      reeply[i].likes = reeply[i].likes - 1;
      reeply[i].isLiked = null;
      setReeply([...reeply]);
    } catch (err) {}
  };

  const removeReplyDislikes = async (Id, i) => {
    try {
      const data = await courseCommentAPI.removeReplyDislikes(id, {
        action: "REMOVEDISLIKE",
        commentId: Id,
      });
      reeply[i].dislikes = reeply[i].dislikes - 1;
      reeply[i].isDisLiked = null;
      setReeply([...reeply]);
    } catch (err) {}
  };

  const handleRlike = (Id, isLiked, isDisliked, ii) => {
    setRlid(Id);
    if (!isLiked) {
      giveReplyLikes(Id, isDisliked, ii);
    } else {
      removeReplyLikes(Id, ii);
    }
  };

  const handleRdislike = (Id, isLiked, isDisliked, ii) => {
    setRdid(Id);
    if (!isDisliked) {
      giveReplyDislikes(Id, isLiked, ii);
    } else {
      removeReplyDislikes(Id, ii);
    }
  };

  const [addToCartText, setAddToCartText] = useState("Add to Cart");

  const cartBtnText = (stage) => {
    if (stage === "CART") {
      setAddToCartText("Go to Cart");
    } else if (stage === "BUYED") {
      setBuy(true);
    }
  };

  const ALERT_TIME = 5000;

  const dispatch1 = useDispatch();
  const handlealert = (text, type) => {
    dispatch1(
      manipulateuserdata(SET_ALERT_DATA, {
        text: text,
        type: type,
      })
    );
    setTimeout(() => {
      dispatch1(manipulateuserdata(SET_ALERT_DATA, { text: "", type: "" }));
    }, ALERT_TIME);
  };

  const report = async () => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        action: "REPORT",
        commentId: reportid,
        reportDescription: UserReport,
      });
      handlealert("report submitted", "success");
    } catch (err) {}
  };

  const addReply = async (Id) => {
    try {
      const data = await courseCommentAPI.editComment(id, {
        reply: userreply,
        commentId: Id,
      });
      data[0].userData = currentuser;
      data[0].likes = 0;
      data[0].dislikes = 0;
      setTotalreplies(totalreplies + 1);
      reeply.unshift(data[0]);
      setReeply([...reeply]);
    } catch (err) {}
  };

  const handleReply = async (Id) => {
    setRid(Id);
    const data = await getReply(Id);
    setReeply(data.repliesData);
    setTotalreplies(parseInt(data.repliesCount));
  };

  

  return (
    <>
      <Grid container sx={{ p: 2, pt: 0 }}>
        {/* width={!fullscreen ? "100%" : '100%'}  */}
        <Grid
          item
          xs={12}
          mds={!fullscreen ? 12 : 9}
          sx={{ paddingTop: "0px!important", bgcolor: "#fff" }}
          width={!fullscreen ? "100%" : "75%"}
        >
          {/* <Box width={!fullscreen ? "100%" : '75%'}> */}
          <Box
            className="player-wrapper"
            height="fit-content"
            sx={{ position: "relative" }}
            onMouseEnter={MouseEntered}
            onMouseLeave={MouseLeave}
          >
            <ReactPlayer
              url={url}
              controls
              className="react-player"
              width="100%"
              height="100%"
              playing={playing}
              onPlay={() => {
                setStates({
                  ...states,
                  playing: true,
                });
              }}
              onPause={() => {
                setStates({
                  ...states,
                  playing: false,
                });
              }}
              onPlaybackRateChange={handlePlayback}
              onDuration={handleDuration}
              onEnded={handleEnd}
              onProgress={handleProgress}
            />
            {
              // hover &&
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "25px",
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "98%",
                }}
              >
                {!fullscreen && (
                  <Fab
                    color="primary"
                    sx={{ width: "44px", height: "44px" }}
                    onClick={() => {
                      setFullscreen(true);
                    }}
                  >
                    <Tooltip title="Open Section">
                      <KeyboardDoubleArrowLeftIcon />
                    </Tooltip>
                  </Fab>
                )}
              </Box>
            }
          </Box>
          {/* </Box > */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              gap: "1rem",
              width: !fullscreen ? "100%" : "100%",
            }}
            onClick={() => setTogglemenu(false)}
          >
            <Box>
              <Typography
                variant="h6"
                color="#292929"
                sx={{
                  fontSize: { xs: "14px", sm: "16px", lg: "20px" },
                  lineHeight: { xs: "18px", sm: "20px", lg: "24px" },
                  fontWeight: "500",
                  display: "-webkit-box!important",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: " vertical",
                }}
              >
                {coursedata[secindex]?.videosData[vidindex]?.videoTitle}
              </Typography>
            </Box>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                gap: "12px",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={5}
                p={0}
                m={0}
                alignItems={"center"}
                display={"flex"}
                justifyContent={"flex-start"}
                gap={"12px"}
              >
                <Avatar
                  sx={{
                    borderRadius: "50%",
                    textTransform: "uppercase",
                    height: { xs: "34px", sm: "36px", lg: "38px" },
                    width: { xs: "34px", sm: "36px", lg: "38px" },
                  }}
                  alt={authordata?.username}
                  src={authordata?.profilePhotoLink}
                >
                  {authordata?.username?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      lineHeight: { xs: "18px", mds: "22px" },
                      fontWeight: "500",
                      marginBottom: "-2px",
                      fontSize: { xs: "14px", mds: "16px" },
                      display: "-webkit-box!important",
                      WebkitLineClamp: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitBoxOrient: " vertical",
                    }}
                    variant="subtitle1"
                    color="#292929"
                  >
                    {authordata.firstName} {authordata.lastName}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "-webkit-box!important",
                      WebkitLineClamp: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitBoxOrient: " vertical",
                    }}
                    fontWeight="400"
                    color="#505050"
                  >
                    {authordata?.username}
                  </Typography>
                </Box>
              </Grid>
              {!buy && (
                <Grid
                  xs={7}
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      fontSize: { xs: "11px", sm: "12px", mds: "13px" },
                      textTransform: { xs: "capitalize", sm: "uppercase" },
                    }}
                    onClick={() => addCourseTocartWithCondition(userdata)}
                  >
                    {addToCartText}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      fontSize: { xs: "11px", sm: "12px", mds: "13px" },
                      textTransform: { xs: "capitalize", sm: "uppercase" },
                    }}
                    onClick={() => {
                      buycourse();
                      setBuy(true);
                    }}
                  >
                    Buy Now
                  </Button>
                </Grid>
              )}
            </Grid>
            <Stack mb={2} direction="column">
              <Typography variant="body2" sx={{}} color="#787878">
                {coursedata[secindex]?.videosData[vidindex]?.videoDescription}
              </Typography>
            </Stack>
            {!buy && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  p: { xs: 1, sm: 2 },
                  border: " 1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#292929",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Description
                </Typography>
                <Typography sx={{ color: "#646464", fontWeight: "400" }}>
                  {userdata?.description}
                </Typography>
                {userdata.descriptionPoints
                  ?.slice(0, more ? userdata.descriptionPoints.length : 4)
                  .map((values, i) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                      }}
                    >
                      <List
                        sx={{
                          listStyleType: "disc",
                          paddingLeft: "1rem",
                          color: "#646464",
                          textTransform: "uppercase",
                        }}
                      >
                        <ListItem sx={{ display: "list-item", gap: "1px" }}>
                          <ListItemText
                            primaryTypographyProps={{
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                          >
                            {values}
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Box>
                  ))}

                {userdata.descriptionPoints?.length > 4 && (
                  <Box>
                    <Button
                      variant="text"
                      onClick={() => {
                        setMore(!more);
                      }}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {more ? "Readless..." : "Readmore..."}
                    </Button>
                  </Box>
                )}
                <Reviews
                  buy={buy}
                  currentuser={currentuser}
                  ratings={parseInt(
                    Math.round((userdata?.rating?.rating ?? 0) * 10) / 10
                  )}
                />
              </Box>
            )}
            {buy && (
              <>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      sx={{ width: "100%" }}
                    >
                      <Tab label="Comments" />
                      <Tab label="About Course" />
                      <Tab label="Resources" />
                      <Tab label="Reviews" />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Grid item xs={12}>
                      <Stack direction="row" alignItems={"center"}>
                        <Typography variant="body2">{`${totalcomments} Comments`}</Typography>
                        <Stack
                          direction="row"
                          sx={{ position: "relative" }}
                          alignItems={"center"}
                        >
                          <IconButton
                            ref={anchorRefMenu}
                            id="composition-button"
                            aria-controls={
                              openMenu ? "composition-menu" : undefined
                            }
                            aria-expanded={openMenu ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                          >
                            <SortIcon
                              sx={{ cursor: "pointer", fontSize: "20px" }}
                            />
                          </IconButton>
                          <Typography variant="body2">Sort by</Typography>
                          <Popper
                            open={openMenu}
                            anchorEl={anchorRefMenu.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                            sx={{ zIndex: "1" }}
                          >
                            {({ TransitionProps, placement }) => (
                              <Grow
                                {...TransitionProps}
                                style={{
                                  transformOrigin:
                                    placement === "bottom-start"
                                      ? "left top"
                                      : "left bottom",
                                }}
                              >
                                <Paper>
                                  <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                      autoFocusItem={openMenu}
                                      id="composition-menu"
                                      aria-labelledby="composition-button"
                                      onKeyDown={handleListKeyDown}
                                    >
                                      <MenuItem onClick={handleClose}>
                                        Top Comments
                                      </MenuItem>
                                      <MenuItem onClick={handleClose}>
                                        Newest first
                                      </MenuItem>
                                    </MenuList>
                                  </ClickAwayListener>
                                </Paper>
                              </Grow>
                            )}
                          </Popper>
                        </Stack>
                      </Stack>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          gap: { xs: "8px", md: "1rem" },
                          alignItems: "center",
                          pt: { xs: 1 },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: { xs: 32, md: 42 },
                            height: { xs: 32, md: 42 },
                            alignItems: "center",
                          }}
                          alt={currentuser?.username}
                          src={currentuser?.profilePhotoLink}
                        >
                          {currentuser?.username.charAt(0)}
                        </Avatar>
                        <TextField
                          label="Type Your Comment here......"
                          fullWidth
                          value={usercommments}
                          onChange={(e) => {
                            setUsercommments(e.target.value);
                          }}
                          size="small"
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            fontSize: { xs: "11px", sm: "12px", mds: "13px" },
                            p: { xs: "2px", md: "4px 16px" },
                            textTransform: {
                              xs: "capitalize",
                              sm: "uppercase",
                            },
                          }}
                          onClick={() => {
                            setUsercommments("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            fontSize: { xs: "11px", sm: "12px", mds: "13px" },
                            p: { xs: "2px", md: "4px 16px" },
                            textTransform: {
                              xs: "capitalize",
                              sm: "uppercase",
                            },
                          }}
                          onClick={() => {
                            addComment();
                            setUsercommments("");
                          }}
                          disabled={!usercommments}
                        >
                          Comment
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        mt: "16px",
                      }}
                    >
                      {comments?.map((values, i) => (
                        <Box sx={{ display: "flex", gap: "1rem" }}>
                          <Avatar
                            sx={{
                              width: { xs: 32, md: 42 },
                              height: { xs: 32, md: 42 },
                              alignItems: "center",
                              fontSize: { xs: "16px", md: "20px" },
                              textTransform: "uppercase",
                            }}
                            alt={values.userData?.username}
                            src={values.userData?.profilePhotoLink}
                          >
                            {values.userData?.username.charAt(0)}
                          </Avatar>
                          <Stack
                            direction="column"
                            spacing={1}
                            sx={{ width: "100%" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <Stack direction="row" spacing={0.5}>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    fontWeight: "bold",
                                    color: "#292929",
                                  }}
                                >
                                  {values.userData?.firstName}{" "}
                                  {values.userData?.lastName}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    color: "#A0A0A0",
                                  }}
                                >
                                  {moment(values.created_at).fromNow()}
                                </Typography>
                              </Stack>
                              <Box sx={{ position: "relative" }}>
                                <MoreVertIcon
                                  sx={{ cursor: "pointer" }}
                                  onClick={() => {
                                    handleDot(values.id, i);
                                  }}
                                />
                                {dot && values.id === Id && (
                                  <Paper
                                    elevation={1}
                                    select
                                    sx={{
                                      width: "130px",
                                      padding: "8px 0px 8px 0px",
                                      alignItems: "center",
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      right: "1rem",
                                      textAlign: "left",
                                    }}
                                  >
                                    <MenuItem
                                      sx={{
                                        width: "130px",
                                        display: "flex",
                                        justifyContent: "space-around",
                                        fontSize: "14px",
                                      }}
                                      onClick={() => {
                                        setEditcomm(true);
                                        setOpen(true);
                                        setDot(false);
                                      }}
                                    >
                                      <EditOutlinedIcon />
                                      Edit
                                    </MenuItem>
                                    <MenuItem
                                      sx={{
                                        width: "130px",
                                        display: "flex",
                                        justifyContent: "space-around",
                                        fontSize: "14px",
                                      }}
                                      onClick={() => {
                                        deleteComment(i);
                                        setDot(false);
                                      }}
                                    >
                                      <DeleteOutlinedIcon />
                                      Delete
                                    </MenuItem>
                                  </Paper>
                                )}
                              </Box>
                            </Box>
                            <Typography
                              sx={{ color: "#505050", fontSize: "14px" }}
                            >
                              {values.comment}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={2}
                              textAlign={"center"}
                            >
                              <Box
                                onClick={() => {
                                  handleLike(
                                    values.id,
                                    values.isLiked,
                                    values.isDisLiked,
                                    i
                                  );
                                }}
                                sx={{ cursor: "pointer" }}
                              >
                                {values.isLiked ? (
                                  <ThumbUpAltIcon
                                    color="primary"
                                    sx={{
                                      fontSize: { xs: "16px", md: "18px" },
                                    }}
                                  />
                                ) : (
                                  <ThumbUpOutlinedIcon
                                    color="#717478"
                                    sx={{
                                      fontSize: { xs: "16px", md: "18px" },
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: "400",
                                  color: "#A0A0A0",
                                }}
                              >
                                {values.likes}
                              </Typography>
                              <Box
                                onClick={() => {
                                  handleDislike(
                                    values.id,
                                    values.isLiked,
                                    values.isDisLiked,
                                    i
                                  );
                                }}
                                sx={{ cursor: "pointer" }}
                              >
                                {values.isDisLiked ? (
                                  <ThumbDownIcon
                                    color="primary"
                                    sx={{
                                      fontSize: { xs: "16px", md: "18px" },
                                    }}
                                  />
                                ) : (
                                  <ThumbDownOffAltRoundedIcon
                                    color="#717478"
                                    sx={{
                                      fontSize: { xs: "16px", md: "18px" },
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontWeight: "400",
                                  color: "#A0A0A0",
                                }}
                              >
                                {values.dislikes}
                              </Typography>
                              <Button
                                variant="text"
                                sx={{ textTransform: "capitalize" }}
                                size="small"
                                onClick={() => {
                                  setOpenreply(!openreply);
                                  setCommments(false);
                                  handleReply(values.id);
                                }}
                              >
                                Reply
                              </Button>
                            </Stack>
                            {openreply && values.id === rid && (
                              <Box
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                  gap: "10px",
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    alignItems: "baseline",
                                    width: "100%",
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: { xs: 24, md: 32 },
                                      height: { xs: 24, md: 32 },
                                      alignItems: "center",
                                      fontSize: { xs: "14px", md: "16px" },
                                      textTransform: "uppercase",
                                      mt: "0px",
                                    }}
                                    alt={currentuser?.username}
                                    src={currentuser?.profilePhotoLink}
                                  >
                                    {currentuser?.username.charAt(0)}
                                  </Avatar>
                                  <TextField
                                    fullWidth
                                    label="Type your reply..."
                                    variant="standard"
                                    size="small"
                                    value={userreply}
                                    onChange={(e) => {
                                      setUserreply(e.target.value);
                                    }}
                                  />
                                </Stack>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  sx={{
                                    justifyContent: "flex-end",
                                    alignItems: "end",
                                  }}
                                >
                                  <Button
                                    variant="text"
                                    size="small"
                                    sx={{
                                      fontSize: {
                                        xs: "11px",
                                        sm: "12px",
                                        mds: "13px",
                                      },
                                      p: { xs: "2px", md: "4px 16px" },
                                      height: "32px",
                                      textTransform: {
                                        xs: "capitalize",
                                        md: "uppercase",
                                      },
                                    }}
                                    onClick={() => {
                                      setUserreply("");
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      fontSize: {
                                        xs: "11px",
                                        sm: "12px",
                                        mds: "13px",
                                      },
                                      p: { xs: "2px", md: "4px 16px" },
                                      height: "32px",
                                      textTransform: {
                                        xs: "capitalize",
                                        md: "uppercase",
                                      },
                                    }}
                                    onClick={() => {
                                      addReply(values.id);
                                      setUserreply("");
                                      setCommments(true);
                                    }}
                                  >
                                    Comment
                                  </Button>
                                </Stack>
                              </Box>
                            )}
                            {openreply && values.id === rid && (
                              <Box sx={{ display: "flex" }}>
                                <ExpandMoreIcon
                                  color="primary"
                                  onClick={() => {
                                    setCommments(!commments);
                                  }}
                                  sx={{ cursor: "pointer" }}
                                />
                                <Typography color="primary">
                                  {totalreplies}
                                </Typography>
                              </Box>
                            )}
                            {commments && values.id === rid && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                }}
                              >
                                {reeply?.map((valuess, ii) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: { xs: "12px", md: "1rem" },
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: { xs: 24, md: 32 },
                                        height: { xs: 24, md: 32 },
                                        alignItems: "center",
                                        fontSize: { xs: "14px", md: "16px" },
                                        textTransform: "uppercase",
                                      }}
                                      alt={valuess.userData?.username}
                                      src={valuess.userData?.profilePhotoLink}
                                    >
                                      {valuess.userData?.username.charAt(0)}
                                    </Avatar>
                                    <Stack
                                      direction="column"
                                      spacing={1}
                                      sx={{ width: "100%" }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          gap: "12px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Box
                                          spacing={0.5}
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: "8px",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "500",
                                              color: "#292929",
                                              display: "-webkit-box!important",
                                              WebkitLineClamp: 1,
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              WebkitBoxOrient: " vertical",
                                            }}
                                          >
                                            {valuess.userData?.firstName}{" "}
                                            {valuess.userData?.lastName}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: "12px",
                                              fontWeight: "400",
                                              color: "#A0A0A0",
                                              display: "-webkit-box!important",
                                              WebkitLineClamp: 1,
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              WebkitBoxOrient: " vertical",
                                            }}
                                          >
                                            {moment(
                                              valuess.created_at
                                            ).fromNow()}
                                          </Typography>
                                        </Box>
                                        <Box sx={{ position: "relative" }}>
                                          <MoreVertIcon
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => {
                                              handleDot(valuess.id);
                                            }}
                                          />
                                          {dot && valuess.id === Id && (
                                            <Paper
                                              elevation={1}
                                              select
                                              sx={{
                                                width: "130px",
                                                padding: "5px 0px 5px 0px",
                                                alignItems: "center",
                                                display: "flex",
                                                flexDirection: "column",
                                                position: "absolute",
                                                right: "1rem",
                                                textAlign: "left",
                                              }}
                                            >
                                              <MenuItem
                                                sx={{
                                                  width: "130px",
                                                  display: "flex",
                                                  justifyContent:
                                                    "space-around",
                                                  fontSize: "14px",
                                                }}
                                                onClick={() => {
                                                  setOpen(true);
                                                  setReportdesc(true);
                                                  setReportid(valuess.id);
                                                }}
                                              >
                                                <OutlinedFlagIcon />
                                                report
                                              </MenuItem>
                                            </Paper>
                                          )}
                                        </Box>
                                      </Box>
                                      <Typography
                                        sx={{
                                          color: "#111112",
                                          fontSize: {
                                            xs: "14px",
                                            md: "16px",
                                            margin: "0px!important",
                                          },
                                        }}
                                      >
                                        {valuess.comment}
                                      </Typography>
                                      <Stack direction="row" spacing={2}>
                                        <Box
                                          onClick={() => {
                                            handleRlike(
                                              valuess.id,
                                              valuess.isLiked,
                                              valuess.isDisLiked,
                                              ii
                                            );
                                          }}
                                          sx={{ cursor: "pointer" }}
                                        >
                                          {valuess.isLiked ? (
                                            <ThumbUpAltIcon
                                              color="primary"
                                              sx={{
                                                fontSize: {
                                                  xs: "16px",
                                                  md: "18px",
                                                },
                                              }}
                                            />
                                          ) : (
                                            <ThumbUpOutlinedIcon
                                              color="#717478"
                                              sx={{
                                                fontSize: {
                                                  xs: "16px",
                                                  md: "18px",
                                                },
                                              }}
                                            />
                                          )}
                                        </Box>
                                        <Typography
                                          sx={{
                                            fontSize: "13px",
                                            fontWeight: "400",
                                            color: "#A0A0A0",
                                          }}
                                        >
                                          {valuess.likes}
                                        </Typography>
                                        <Box
                                          onClick={() => {
                                            handleRdislike(
                                              valuess.id,
                                              valuess.isLiked,
                                              valuess.isDisLiked,
                                              ii
                                            );
                                          }}
                                          sx={{ cursor: "pointer" }}
                                        >
                                          {valuess.isDisLiked ? (
                                            <ThumbDownIcon
                                              color="primary"
                                              sx={{
                                                fontSize: {
                                                  xs: "16px",
                                                  md: "18px",
                                                },
                                              }}
                                            />
                                          ) : (
                                            <ThumbDownOffAltRoundedIcon
                                              color="#717478"
                                              sx={{
                                                fontSize: {
                                                  xs: "16px",
                                                  md: "18px",
                                                },
                                              }}
                                            />
                                          )}
                                        </Box>
                                        <Typography
                                          sx={{
                                            fontSize: "13px",
                                            fontWeight: "400",
                                            color: "#A0A0A0",
                                          }}
                                        >
                                          {valuess.dislikes}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                            color: "#292929",
                                            cursor: "pointer",
                                          }}
                                          onClick={() => {}}
                                        >
                                          Reply
                                        </Typography>
                                      </Stack>
                                    </Stack>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Stack>
                        </Box>
                      ))}
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          textAlign: "justify",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ color: "#292929", fontWeight: "bold" }}
                        >
                          Description
                        </Typography>
                        <Typography
                          sx={{ color: "#646464", fontWeight: "400" }}
                        >
                          {userdata?.description}
                        </Typography>
                        <List
                          sx={{
                            listStyleType: "disc",
                            color: "#646464",
                            textTransform: "uppercase",
                            marginLeft: "1em"
                          }}
                        >
                          {userdata?.descriptionPoints?.map((value, id) => (
                            <ListItem key={id} sx={{ display: "list-item", textAlign: "justify", padding: 0}}>
                              <ListItemText
                                primaryTypographyProps={{
                                  fontSize: "14px",
                                  fontWeight: "400",
                                }}
                              >
                                {value}
                              </ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Box>
                        <Typography
                          variant="h6"
                          sx={{ color: "#292929", fontWeight: "bold" }}
                        >
                          Resources
                        </Typography>
                    <Grid mb={1} container spacing={2}>
                      <Grid item sx={{textAlign: {xs:"center", sm: "start"}}}  xs={4} sm={6}>
                          <Typography variant="caption" pl={{xs: 0, sm: 4}} sx={{ color: "#3D3D3D", flexBasis: "10%" }}>
                          Name
                        </Typography>
                      </Grid>
                      <Grid item sx={{textAlign: "center"}}  xs={2} sm={2}>
                          <Typography variant="caption" sx={{ color: "#3D3D3D", flexBasis: "10%" }}>
                          Size
                        </Typography>
                      </Grid>
                      <Grid item sx={{textAlign: "center"}}  xs={3} sm={2}>
                          <Typography variant="caption" sx={{ color: "#3D3D3D"}}>
                           Uploaded at
                        </Typography>
                      </Grid>
                      <Grid item sx={{textAlign: "center"}}  xs={3} sm={2}>
                          <Typography variant="caption" sx={{ color: "#3D3D3D"}}>
                          File
                        </Typography>
                      </Grid>
                    </Grid>
                     
                      <Box
                      >
                        <hr />
                        {coursedata[secindex]?.videosData[
                          vidindex
                        ]?.extraFiles.map((values, index) => (
                          <Grid container py={1} spacing={2} 
                          >
                            <Grid item  xs ={4} sm={6}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                                overFlow: "hidden",
                                textOverflow: "elipsis",
                              }}
                            >
                              <Box  sx={{display: {xs: "none", sm: "block"}}}>

                              <img src={File} style={{width: "30px", height: "30px"}} alt="icon" />
                              </Box>
                              <Stack
                                direction="column"
                                sx={{overFlow: "hidden",textOverflow: "elipsis", width: {xs: "100%", sm: "auto"}}}
                              >
                                <Typography noWrap sx={{ color: "#3D3D3D"}}>
                                  {values.fileName}
                                </Typography>
                              </Stack>
                            </Box>
                            </Grid>
                            <Grid item sx={{textAlign: "center"}}  xs ={2} sm={2}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#8C8C8C",
                              }}
                            >
                              {Math.round(values.fileSize / 100000)}KB
                            </Typography>
                            </Grid>
                            <Grid  item sx={{textAlign: "center"}}   xs={3} sm={2}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#8C8C8C",
                              }}
                            >
                              {values.created_at.slice(0, -14)}
                            </Typography>
                            </Grid>
                           <Grid item sx={{textAlign: "center"}}  xs={3} sm={2}>
                           <Button  variant="outlined" size=""> 
                              <a
                                target="_blank"
                                href={values.fileUrl}
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  color: "#698AFF",
                                  textTransform: "capitalize",
                                  textDecoration: "none",
                                }}
                              >
                                Preview
                              </a>
                            </Button>
                           </Grid>
                          </Grid>
                        ))}
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Reviews
                      buy={buy}
                      currentuser={currentuser}
                      ratings={parseInt(
                        Math.round((userdata?.rating?.rating ?? 0) * 10) / 10
                      )}
                    />
                  </TabPanel>
                </Box>

                {/* <Paper sx={{ width: "640px", height: "40px" }} elevation={4}>
                  <ButtonGroup variant="text" orientation="horizontal">
                    <Button
                      disableRipple
                      sx={{
                        width: "155px",
                        padding: "8px 42px",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        backgroundColor: com ? "#0A0A0A" : "#ffffff",
                        color: com ? "#ffffff" : "#505050",
                        "&:hover": {
                          backgroundColor: "#000000",
                          color: "#ffffff",
                        },
                      }}
                      onClick={handleCom}
                    >
                      Comments
                    </Button>
                    <Button
                      disableRipple
                      sx={{
                        width: "185px",
                        padding: "8px 42px",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        backgroundColor: course ? "#0A0A0A" : "#ffffff",
                        color: course ? "#ffffff" : "#505050",
                        "&:hover": {
                          backgroundColor: "#000000",
                          color: "#ffffff",
                        },
                      }}
                      onClick={handleCourse}
                    >
                      About Course
                    </Button>
                    <Button
                      disableRipple
                      sx={{
                        width: "153px",
                        padding: "8px 42px",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        backgroundColor: reso ? "#0A0A0A" : "#ffffff",
                        color: reso ? "#ffffff" : "#505050",
                        "&:hover": {
                          backgroundColor: "#000000",
                          color: "#ffffff",
                        },
                      }}
                      onClick={handleReso}
                    >
                      Resources
                    </Button>
                    <Button
                      disableRipple
                      sx={{
                        width: "153px",
                        padding: "8px 42px",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        backgroundColor: review ? "#0A0A0A" : "#ffffff",
                        color: review ? "#ffffff" : "#505050",
                        "&:hover": {
                          backgroundColor: "#000000",
                          color: "#ffffff",
                        },
                      }}
                      onClick={handleReviews}
                    >
                      Reviews
                    </Button>
                  </ButtonGroup>
                </Paper> */}

                {/* {com && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <Stack direction="row" spacing={4}>
                      <Typography>{totalcomments}</Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ position: "relative" }}
                      >
                        <SortIcon
                          onClick={handleSort}
                          sx={{ cursor: "pointer" }}
                        />
                        <Typography>Sort by</Typography>
                      </Stack>
                    </Stack>
                    {sort && (
                      <Paper
                        elevation={3}
                        select
                        sx={{
                          width: "130px",
                          height: "88px",
                          padding: "8px 0px 8px 0px",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                          position: "absolute",
                          left: "10rem",
                          top: "63rem",
                          zIndex: "10",
                        }}
                      >
                        <MenuItem>Top Comments</MenuItem>
                        <MenuItem>Newest first</MenuItem>
                      </Paper>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        width: fullscreen ? "984px" : "100%",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          borderRadius: "50%",
                          width: "44px",
                          height: "44px",
                          textTransform: "uppercase",
                        }}
                        alt={currentuser?.username}
                        src={currentuser?.profilePhotoLink}
                      >
                        {currentuser?.username.charAt(0)}
                      </Avatar>
                      <TextField
                        label="Type Your Comment here......"
                        sx={{ width: fullscreen ? "727px" : "100%" }}
                        value={usercommments}
                        onChange={(e) => {
                          setUsercommments(e.target.value);
                        }}
                      ></TextField>
                      <Button
                        variant="text"
                        sx={{ height: "44px", padding: "12px 14px" }}
                        onClick={() => {
                          setUsercommments("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ height: "44px", padding: "12px 14px" }}
                        onClick={() => {
                          addComment();
                          setUsercommments("");
                        }}
                        disabled={!usercommments}
                      >
                        Comment
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        {comments?.map((values, i) => (
                          <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Avatar
                              sx={{
                                width: { xs: 32, md: 42 },
                                height: { xs: 32, md: 42 },
                                alignItems: "center",
                                fontSize: { xs: "16px", md: "20px" },
                                textTransform: "uppercase",
                              }}
                              alt={values.userData?.username}
                              src={values.userData?.profilePhotoLink}
                            >
                              {values.userData?.username.charAt(0)}
                            </Avatar>
                            <Stack
                              direction="column"
                              spacing={1}
                              sx={{ width: "100%" }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  alignItems: "center",
                                }}
                              >
                                <Stack direction="row" spacing={0.5}>
                                  <Typography
                                    sx={{
                                      fontSize: "13px",
                                      fontWeight: "bold",
                                      color: "#292929",
                                    }}
                                  >
                                    {values.userData?.firstName}{" "}
                                    {values.userData?.lastName}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: "400",
                                      color: "#A0A0A0",
                                    }}
                                  >
                                    {moment(values.created_at).fromNow()}
                                  </Typography>
                                </Stack>
                                <Box sx={{ position: "relative" }}>
                                  <MoreVertIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleDot(values.id, i);
                                    }}
                                  />
                                  {dot && values.id === Id && (
                                    <Paper
                                      elevation={1}
                                      select
                                      sx={{
                                        width: "130px",
                                        padding: "8px 0px 8px 0px",
                                        alignItems: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "absolute",
                                        right: "1rem",
                                        textAlign: "left",
                                      }}
                                    >
                                      <MenuItem
                                        sx={{
                                          width: "130px",
                                          display: "flex",
                                          justifyContent: "space-around",
                                          fontSize: "14px",
                                        }}
                                        onClick={() => {
                                          setEditcomm(true);
                                          setOpen(true);
                                          setDot(false);
                                        }}
                                      >
                                        <EditOutlinedIcon />
                                        Edit
                                      </MenuItem>
                                      <MenuItem
                                        sx={{
                                          width: "130px",
                                          display: "flex",
                                          justifyContent: "space-around",
                                          fontSize: "14px",
                                        }}
                                        onClick={() => {
                                          deleteComment(i);
                                          setDot(false);
                                        }}
                                      >
                                        <DeleteOutlinedIcon />
                                        Delete
                                      </MenuItem>
                                    </Paper>
                                  )}
                                </Box>
                              </Box>
                              <Typography
                                sx={{ color: "#505050", fontSize: "14px" }}
                              >
                                {values.comment}
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={2}
                                textAlign={"center"}
                              >
                                <Box
                                  onClick={() => {
                                    handleLike(
                                      values.id,
                                      values.isLiked,
                                      values.isDisLiked,
                                      i
                                    );
                                  }}
                                  sx={{ cursor: "pointer" }}
                                >
                                  {values.isLiked ? (
                                    <ThumbUpAltIcon
                                      color="primary"
                                      sx={{
                                        fontSize: { xs: "16px", md: "18px" },
                                      }}
                                    />
                                  ) : (
                                    <ThumbUpOutlinedIcon
                                      color="#717478"
                                      sx={{
                                        fontSize: { xs: "16px", md: "18px" },
                                      }}
                                    />
                                  )}
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    fontWeight: "400",
                                    color: "#A0A0A0",
                                  }}
                                >
                                  {values.likes}
                                </Typography>
                                <Box
                                  onClick={() => {
                                    handleDislike(
                                      values.id,
                                      values.isLiked,
                                      values.isDisLiked,
                                      i
                                    );
                                  }}
                                  sx={{ cursor: "pointer" }}
                                >
                                  {values.isDisLiked ? (
                                    <ThumbDownIcon
                                      color="primary"
                                      sx={{
                                        fontSize: { xs: "16px", md: "18px" },
                                      }}
                                    />
                                  ) : (
                                    <ThumbDownOffAltRoundedIcon
                                      color="#717478"
                                      sx={{
                                        fontSize: { xs: "16px", md: "18px" },
                                      }}
                                    />
                                  )}
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: "13px",
                                    fontWeight: "400",
                                    color: "#A0A0A0",
                                  }}
                                >
                                  {values.dislikes}
                                </Typography>
                                <Button
                                  variant="text"
                                  sx={{ textTransform: "capitalize" }}
                                  size="small"
                                  onClick={() => {
                                    setOpenreply(!openreply);
                                    setCommments(false);
                                    handleReply(values.id);
                                  }}
                                >
                                  Reply
                                </Button>
                              </Stack>
                              {openreply && values.id === rid && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    width: "100%",
                                    gap: "10px",
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                      alignItems: "baseline",
                                      width: "100%",
                                    }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: { xs: 24, md: 32 },
                                        height: { xs: 24, md: 32 },
                                        alignItems: "center",
                                        fontSize: { xs: "14px", md: "16px" },
                                        textTransform: "uppercase",
                                        mt: "0px",
                                      }}
                                      alt={currentuser?.username}
                                      src={currentuser?.profilePhotoLink}
                                    >
                                      {currentuser?.username.charAt(0)}
                                    </Avatar>
                                    <TextField
                                      label="Type your reply..."
                                      variant="standard"
                                      size="small"
                                      value={userreply}
                                      onChange={(e) => {
                                        setUserreply(e.target.value);
                                      }}
                                    />
                                  </Stack>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                      justifyContent: "flex-end",
                                      alignItems: "end",
                                    }}
                                  >
                                    <Button
                                      variant="text"
                                      size="small"
                                      sx={{
                                        fontSize: {
                                          xs: "11px",
                                          sm: "12px",
                                          mds: "13px",
                                        },
                                        p: { xs: "2px", md: "4px 16px" },
                                        height: "32px",
                                        textTransform: {
                                          xs: "capitalize",
                                          md: "uppercase",
                                        },
                                      }}
                                      onClick={() => {
                                        setUserreply("");
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        fontSize: {
                                          xs: "11px",
                                          sm: "12px",
                                          mds: "13px",
                                        },
                                        p: { xs: "2px", md: "4px 16px" },
                                        height: "32px",
                                        textTransform: {
                                          xs: "capitalize",
                                          md: "uppercase",
                                        },
                                      }}
                                      onClick={() => {
                                        addReply(values.id);
                                        setUserreply("");
                                        setCommments(true);
                                      }}
                                    >
                                      Comment
                                    </Button>
                                  </Stack>
                                </Box>
                              )}
                              {openreply && values.id === rid && (
                                <Box sx={{ display: "flex" }}>
                                  <ExpandMoreIcon
                                    color="primary"
                                    onClick={() => {
                                      setCommments(!commments);
                                    }}
                                    sx={{ cursor: "pointer" }}
                                  />
                                  <Typography color="primary">
                                    {totalreplies}
                                  </Typography>
                                </Box>
                              )}
                              {commments && values.id === rid && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                  }}
                                >
                                  {reeply?.map((valuess, ii) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        gap: { xs: "12px", md: "1rem" },
                                      }}
                                    >
                                      <Avatar
                                        sx={{
                                          width: { xs: 24, md: 32 },
                                          height: { xs: 24, md: 32 },
                                          alignItems: "center",
                                          fontSize: { xs: "14px", md: "16px" },
                                          textTransform: "uppercase",
                                        }}
                                        alt={valuess.userData?.username}
                                        src={valuess.userData?.profilePhotoLink}
                                      >
                                        {valuess.userData?.username.charAt(0)}
                                      </Avatar>
                                      <Stack
                                        direction="column"
                                        spacing={1}
                                        sx={{ width: "100%" }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: "12px",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Box
                                            spacing={0.5}
                                            sx={{
                                              display: "flex",
                                              flexDirection: "row",
                                              gap: "8px",
                                            }}
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: "13px",
                                                fontWeight: "500",
                                                color: "#292929",
                                                display:
                                                  "-webkit-box!important",
                                                WebkitLineClamp: 1,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitBoxOrient: " vertical",
                                              }}
                                            >
                                              {valuess.userData?.firstName}{" "}
                                              {valuess.userData?.lastName}
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: "12px",
                                                fontWeight: "400",
                                                color: "#A0A0A0",
                                                display:
                                                  "-webkit-box!important",
                                                WebkitLineClamp: 1,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                WebkitBoxOrient: " vertical",
                                              }}
                                            >
                                              {moment(
                                                valuess.created_at
                                              ).fromNow()}
                                            </Typography>
                                          </Box>
                                          <Box sx={{ position: "relative" }}>
                                            <MoreVertIcon
                                              sx={{ cursor: "pointer" }}
                                              onClick={() => {
                                                handleDot(valuess.id);
                                              }}
                                            />
                                            {dot && valuess.id === Id && (
                                              <Paper
                                                elevation={1}
                                                select
                                                sx={{
                                                  width: "130px",
                                                  padding: "5px 0px 5px 0px",
                                                  alignItems: "center",
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  position: "absolute",
                                                  right: "1rem",
                                                  textAlign: "left",
                                                }}
                                              >
                                                <MenuItem
                                                  sx={{
                                                    width: "130px",
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-around",
                                                    fontSize: "14px",
                                                  }}
                                                  onClick={() => {
                                                    setOpen(true);
                                                    setReportdesc(true);
                                                    setReportid(valuess.id);
                                                  }}
                                                >
                                                  <OutlinedFlagIcon />
                                                  report
                                                </MenuItem>
                                              </Paper>
                                            )}
                                          </Box>
                                        </Box>
                                        <Typography
                                          sx={{
                                            color: "#111112",
                                            fontSize: {
                                              xs: "14px",
                                              md: "16px",
                                              margin: "0px!important",
                                            },
                                          }}
                                        >
                                          {valuess.comment}
                                        </Typography>
                                        <Stack direction="row" spacing={2}>
                                          <Box
                                            onClick={() => {
                                              handleRlike(
                                                valuess.id,
                                                valuess.isLiked,
                                                valuess.isDisLiked,
                                                ii
                                              );
                                            }}
                                            sx={{ cursor: "pointer" }}
                                          >
                                            {valuess.isLiked ? (
                                              <ThumbUpAltIcon
                                                color="primary"
                                                sx={{
                                                  fontSize: {
                                                    xs: "16px",
                                                    md: "18px",
                                                  },
                                                }}
                                              />
                                            ) : (
                                              <ThumbUpOutlinedIcon
                                                color="#717478"
                                                sx={{
                                                  fontSize: {
                                                    xs: "16px",
                                                    md: "18px",
                                                  },
                                                }}
                                              />
                                            )}
                                          </Box>
                                          <Typography
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "400",
                                              color: "#A0A0A0",
                                            }}
                                          >
                                            {valuess.likes}
                                          </Typography>
                                          <Box
                                            onClick={() => {
                                              handleRdislike(
                                                valuess.id,
                                                valuess.isLiked,
                                                valuess.isDisLiked,
                                                ii
                                              );
                                            }}
                                            sx={{ cursor: "pointer" }}
                                          >
                                            {valuess.isDisLiked ? (
                                              <ThumbDownIcon
                                                color="primary"
                                                sx={{
                                                  fontSize: {
                                                    xs: "16px",
                                                    md: "18px",
                                                  },
                                                }}
                                              />
                                            ) : (
                                              <ThumbDownOffAltRoundedIcon
                                                color="#717478"
                                                sx={{
                                                  fontSize: {
                                                    xs: "16px",
                                                    md: "18px",
                                                  },
                                                }}
                                              />
                                            )}
                                          </Box>
                                          <Typography
                                            sx={{
                                              fontSize: "13px",
                                              fontWeight: "400",
                                              color: "#A0A0A0",
                                            }}
                                          >
                                            {valuess.dislikes}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: "12px",
                                              fontWeight: "bold",
                                              color: "#292929",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {}}
                                          >
                                            Reply
                                          </Typography>
                                        </Stack>
                                      </Stack>
                                    </Box>
                                  ))}
                                </Box>
                              )}
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Pagination
                          page={page}
                          onChange={(event, page) => {
                            setPage(page);
                          }}
                          count={Math.ceil(parseInt(totalcomments) / 10)}
                          variant="outlined"
                          shape="rounded"
                        />
                      </Box>
                    </Box>
                  </Box>
                )} */}
                {course && (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#292929", fontWeight: "bold" }}
                      >
                        Description
                      </Typography>
                      <Typography sx={{ color: "#646464", fontWeight: "400" }}>
                        {userdata?.description}
                      </Typography>
                      {userdata?.descriptionPoints?.map((value, id) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1px",
                          }}
                          key={value.id}
                        >
                          <List
                            sx={{
                              listStyleType: "disc",
                              paddingLeft: "1rem",
                              color: "#646464",
                              textTransform: "uppercase",
                            }}
                          >
                            <ListItem sx={{ display: "list-item", gap: "1px" }}>
                              <ListItemText
                                primaryTypographyProps={{
                                  fontSize: "14px",
                                  fontWeight: "400",
                                }}
                              >
                                {value}
                              </ListItemText>
                            </ListItem>
                          </List>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
                {reso && (
                  <Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ color: "#292929", fontWeight: "bold" }}
                      >
                        Resources
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "1rem 0px 10px 0px",
                        width: fullscreen ? "763px" : "100%",
                      }}
                    >
                      <Typography variant="caption" sx={{ color: "#3D3D3D" }}>
                        Full name
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#3D3D3D" }}>
                        File size
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#3D3D3D" }}>
                        Data upload
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <hr />
                      {coursedata[secindex]?.videosData[
                        vidindex
                      ]?.extraFiles.map((values, index) => (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                            }}
                          >
                            <img src={File} alt="icon" />
                            <Stack
                              direction="column"
                              sx={{ position: "relative" }}
                            >
                              <Typography sx={{ color: "#3D3D3D" }}>
                                {values.fileName}
                              </Typography>
                              {/* <Typography variant='caption' sx={{ color: '#8C8C8C' }}>{values.fileSize}</Typography> */}
                            </Stack>
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#8C8C8C",
                              position: "absolute",
                              left: "24rem",
                            }}
                          >
                            {Math.round(values.fileSize / 100000)}KB
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#8C8C8C",
                              position: "absolute",
                              left: "45rem",
                            }}
                          >
                            {values.created_at.slice(0, -14)}
                          </Typography>
                          <Button variant="outlined">
                            <a
                              target="_blank"
                              href={values.fileUrl}
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                color: "#698AFF",
                                textTransform: "capitalize",
                                textDecoration: "none",
                              }}
                            >
                              Preview
                            </a>
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
                {review && (
                  <Reviews
                    buy={buy}
                    fullscreen={fullscreen}
                    ratings={
                      Math.round((userdata?.rating.rating ?? 0) * 10) / 10
                    }
                  />
                )}
                <Box sx={{ marginBottom: "4rem" }}></Box>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} mds={3} sx={{ bgcolor: "#fff" }}>
          <Getcourses
            coursedata={coursedata}
            userdata={userdata}
            states={states}
            setStates={setStates}
            setUrl={setUrl}
            buy={buy}
            setSecindex={setSecindex}
            setVidindex={setVidindex}
            userprogress={userprogress}
            userprogresss={userprogresss}
            secindex={secindex}
            setUserprogresss={setUserprogresss}
            vid={vid}
            setVid={setVid}
            fullscreen={fullscreen}
            setFullscreen={setFullscreen}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Coursevideo;
