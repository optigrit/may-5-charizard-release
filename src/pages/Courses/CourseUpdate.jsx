import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SubHeader from "../../components/SideBarResponsive/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { IconTextField } from "../../components/TextField";
import Skeletons from "../../components/Skeleton/Skeletons";
import axios from "axios";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";

const drawerWidth = 240;

const CourseUpdate = () => {
  const params = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [categories, setCategories] = useState("");
  const [keyPoints, setKeyPoints] = useState([""]);
  const [descriptionPoints, setDescriptionPoints] = useState([""]);
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageProgress, setImageProgress] = useState(false);
  const [videoProgress, setVideoProgress] = useState(false);
  const [showUploadBtn, setBhowUploadBtn] = useState(false);
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);

  const navigate = useNavigate();

  const Token = localStorage.getItem("Token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080",
      Authorization: `bearer ${Token}`,
    },
  };

  const ALERT_TIME = 5000;
  const dispatch = useDispatch();
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

  useEffect(() => {
    const data = async () => {
      // setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL}course/${params.id}`,
          config
        );
        setTitle(data?.data?.courseData?.title);
        setPrice(data?.data?.courseData?.price);
        setCategories(data?.data?.courseData?.categories);
        setTechStack(data?.data?.courseData?.techStack);
        setDescription(data?.data?.courseData?.description);
        setDescriptionPoints(data?.data?.courseData?.descriptionPoints);
        setKeyPoints(data?.data?.courseData?.keyPoints);
        setImageUrl(data?.data?.courseData?.imageUrl);
        setTrailerUrl(data?.data?.courseData?.trailerUrl);
      } catch (err) {}
    };

    data();
  }, []);

  const uploadImage = async () => {
    setImageProgress(true);
    let fileName = `files/${imageUrl?.name + v4()}`;
    const fileRef = ref(storage, fileName);
    await uploadBytes(fileRef, imageUrl).then(() => {
      handlealert("Image has been uploaded", "success");

      setImageProgress(false);
    });
    return fileName;
  };

  const uploadVideo = async () => {
    setVideoProgress(true);
    let videoFileName = `files/${trailerUrl?.name + v4()}`;
    const videoFileRef = ref(storage, videoFileName);
    await uploadBytes(videoFileRef, trailerUrl).then(() => {
      handlealert("Video has been uploaded", "success");
      setVideoProgress(false);
    });
    return videoFileName;
  };

  const handleNormal = async (postData) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_URL}course/${params.id}`,
        postData,
        config
      );
      handlealert("Course updated successfully", "success");
    } catch (err) {}
  };
  const handleUpdateImgTrailer = async (imageDataUrl, videoDataUrl) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_URL}course/links/${params.id}`,
        { imageUrl: imageDataUrl, trailerUrl: videoDataUrl },
        config
      );
    } catch (err) {}
  };

  const uploadData = async (e) => {
    // e.preventDefault();
    const imageData = uploadImage();
    const videoData = uploadVideo();
    const [imageDataUrl, videoDataUrl] = await Promise.all([
      imageData,
      videoData,
    ]);
    const postData = {
      title: title,
      price: price,
      categories: categories,
      keyPoints: keyPoints,
      descriptionPoints: descriptionPoints,
      techStack: techStack,
      description: description,
    };
    if (postData) {
      handleNormal(postData);
      handleUpdateImgTrailer(imageDataUrl, videoDataUrl);
    } else {
    }
  };

  const handleAddKeyPoint = () => {
    const trimed = keyPoints.map((item) => {
      return item.trim();
    });
    if (trimed.length <= 1) {
      if (trimed.includes("", trimed)) {
        handlealert("Key point should not be empty", "error");
      } else {
        setKeyPoints([...trimed, ""]);
      }
    } else {
      handlealert("Key points can not be more then 2", "error");
    }
  };
  const handleInputChangeKeypoints = (event, index) => {
    const keyP = [...keyPoints];
    keyP[index] = event.target.value;
    setKeyPoints(keyP);
  };
  const handleRemoveKeypoint = (index) => {
    if (keyPoints.length > 1) {
      const keyP = [...keyPoints];
      keyP.splice(index, 1);
      setKeyPoints(keyP);
    } else {
      handlealert("You need to fill one key point at least", "error");
    }
  };

  const handleAddPointDescription = () => {
    const trimed = descriptionPoints.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      handlealert("Description point should not be empty", "error");
    } else {
      setDescriptionPoints([...trimed, ""]);
    }
  };
  const handleChangeInput = (event, index) => {
    const des = [...descriptionPoints];
    des[index] = event.target.value;
    setDescriptionPoints(des);
  };
  const handleRemoveDescriptionPoint = (index) => {
    if (descriptionPoints.length > 1) {
      const des = [...descriptionPoints];
      des.splice(index, 1);
      setDescriptionPoints(des);
    } else {
      handlealert("You need to fill one description point at least", "error");
    }
  };

  const courseId = useSelector((state) => state?.EditCourse?.courseId);
  const handleEditForm = () => {};

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handleCreateCourse = (e) => {
    e.preventDefault();
    console.log("uploadData");
    const trimed = descriptionPoints.map((item) => {
      return item.trim();
    });
    const keyPointTrimed = keyPoints.map((item) => {
      return item.trim();
    });
    console.log(trimed.length, "trimed");

    if (keyPoints.length && !keyPointTrimed.includes("")) {
      uploadData();
    } else {
      handlealert("Please add at least one Key point", "error");
    }
  };

  return (
    <>
      {/* <SideBarResponsive /> */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <SubHeader
          title={"Course Update"}
          // handleEditForm={handleEditForm}
          // showUploadBtn={showUploadBtn}
          // UploadTitle={"Update"}
          FormId={"create-course-form"}
        />
        <Box sx={{ p: 2, width: "720px" }}>
          <form onSubmit={handleCreateCourse} id="create-course-form">
            <Box sx={{ mb: 2, display: "flex" }}>
              <TextField
                size="small"
                label={"Title"}
                sx={{ mr: 2 }}
                type="text"
                required
                fullWidth
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></TextField>
              <TextField
                size="small"
                label={"Price"}
                type="number"
                required
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></TextField>
            </Box>
            <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
              <Box>
                <IconTextField
                  size="small"
                  label={"Upload Thumbnail"}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: "image/jpeg,image/x-png" }}
                  // sx={{ mr: 2 }}/
                  type="file"
                  fullWidth
                  required
                  iconEnd={
                    imageProgress ? (
                      <Skeletons type="smallCircularLoader" />
                    ) : null
                  }
                  onChange={(event) => {
                    setImageUrl(event.target.files[0]);
                  }}
                />
                <Button
                  fullWidth
                  sx={{
                    fontSize: "12px!important",
                    mt: 1,
                    display: "flex",
                    justifyContent: "left",
                  }}
                  onClick={() => openInNewTab(imageUrl && imageUrl)}
                >
                  view previous Image
                </Button>
              </Box>
              <Box>
                <IconTextField
                  size="small"
                  label={"Upload Trailer"}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: "video/mp4" }}
                  type="file"
                  fullWidth
                  required
                  iconEnd={
                    videoProgress ? (
                      <Skeletons type="smallCircularLoader" />
                    ) : null
                  }
                  onChange={(event) => {
                    setTrailerUrl(event.target.files[0]);
                  }}
                />
                <Button
                  fullWidth
                  sx={{
                    fontSize: "12px!important",
                    mt: 1,
                    display: "flex",
                    justifyContent: "left",
                  }}
                  onClick={() => openInNewTab(trailerUrl && trailerUrl)}
                >
                  view previous Video
                </Button>
              </Box>
            </Box>
            <Box sx={{ mb: 2, display: "flex" }}>
              <TextField
                size="small"
                label={"categories"}
                sx={{ mr: 2 }}
                fullWidth
                value={categories}
                onChange={(event) => {
                  setCategories(event.target.value);
                }}
              />
              <TextField
                size="small"
                label={"Tech Stack"}
                fullWidth
                value={techStack}
                onChange={(event) => {
                  setTechStack(event.target.value);
                }}
              />
            </Box>
            <Box sx={{ mb: 2, display: "flex" }}>
              <TextField
                size="small"
                id="outlined-textarea"
                label={"description"}
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Box>

            <Box sx={{ mb: 2, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}>
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", color: "#474747" }}
              >
                Key Points
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
              >
                Key Points will be shown in list
              </Typography>
              {keyPoints?.map((item, index) => {
                return (
                  <>
                    <IconTextField
                      sx={{ mb: 2, backgroundColor: "white" }}
                      size="small"
                      label={"key Points"}
                      fullWidth
                      value={item}
                      onChange={(event) => {
                        handleInputChangeKeypoints(event, index);
                      }}
                    />
                    <Box display={"flex"} justifyContent="space-between">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleRemoveKeypoint(index)}
                        sx={{ textTransform: "none", mb: 2 }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </>
                );
              })}

              <Button
                size="small"
                onClick={handleAddKeyPoint}
                sx={{ textTransform: "none", mb: 2 }}
              >
                <AddIcon
                  sx={{
                    color: "#698AFF",
                    fontSize: 16,
                    cursor: "pointer",
                    mr: 1,
                  }}
                />
                Add Additional Key Points
              </Button>
            </Box>
            <Box sx={{ mb: 2, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}>
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", color: "#474747" }}
              >
                Description Points
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
              >
                Description Points will be shown in list
              </Typography>
              {descriptionPoints?.map((item, index) => {
                return (
                  <>
                    <IconTextField
                      size="small"
                      label={"description Points"}
                      sx={{ mb: 2, backgroundColor: "white" }}
                      fullWidth
                      value={item}
                      onChange={(event) => {
                        handleChangeInput(event, index);
                      }}
                    />
                    <Box display={"flex"} justifyContent="space-between">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleRemoveDescriptionPoint(index)}
                        sx={{ textTransform: "none", mb: 2 }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </>
                );
              })}
              <Button
                size="small"
                onClick={handleAddPointDescription}
                sx={{ textTransform: "none", mb: 2 }}
              >
                <AddIcon
                  sx={{
                    color: "#698AFF",
                    fontSize: 16,
                    cursor: "pointer",
                    mr: 1,
                  }}
                />
                Add Additional Description Point
              </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                size="small"
                sx={{ mr: 2 }}
                onClick={() => {
                  navigate(`/courseupload/${params.id}`);
                }}
              >
                Upload Course Videos
              </Button>
              <Button variant="contained" size="small" type="submit">
                Update Course
              </Button>
            </Box>
            {/* {imageUrl && (
                <CardMedia
                  component="img"
                  sx={{
                    height: 80,
                    objectFit: "cover",
                  }}
                  alt={imageUrl}
                  src={URL.createObjectURL(imageUrl)}
                />
              )} */}
          </form>
        </Box>
      </Box>
    </>
  );
};
export default CourseUpdate;
