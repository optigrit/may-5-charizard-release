import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useRef } from "react";
import SubHeader from "../../components/SideBarResponsive/SubHeader";
import { IconTextField } from "../../components/TextField";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import AddIcon from "@mui/icons-material/Add";
import Skeletons from "../../components/Skeleton/Skeletons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";
import { courseAPI } from "../../api/requests/courses/courseAPI";

const CreateCourse = () => {
  const drawerWidth = 240;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [categories, setCategories] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [descriptionPoints, setDescriptionPoints] = useState([]);
  const [techStack, setTechStack] = useState("");
  const [description, setDescription] = useState("");
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageProgress, setImageProgress] = useState(false);
  const [videoProgress, setVideoProgress] = useState(false);
  const [showUploadBtn, setBhowUploadBtn] = useState(false);
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);

  const priceRef = useRef(null);
  const categoriesRef = useRef(null);
  const techStackRef = useRef(null);
  const descRef = useRef(null);

  const params = useParams();
  const navigate = useNavigate();
  const handleGoToUploadpage = (id) => {
    navigate(`/courseupload/${id}`);
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

  const uploadImage = async () => {
    if (imageUrl === null) return "";
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
    if (trailerUrl === null) return "";
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
      const data = await courseAPI.createCourse(postData);
      handlealert("Course created successfully", "success");
      handleGoToUploadpage(data.id);
    } catch (err) {}
  };

  const uploadData = async (e) => {
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
      imageUrl: imageDataUrl,
      trailerUrl: videoDataUrl,
    };
    if (postData) {
      handleNormal(postData);
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
      handlealert("Key point can not be more then 2", "error");
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
  const handleCreateCourse = (e) => {
    e.preventDefault();
    const trimed = descriptionPoints.map((item) => {
      return item.trim();
    });
    const keyPointTrimed = keyPoints.map((item) => {
      return item.trim();
    });

    if (keyPoints.length && !keyPointTrimed.includes("")) {
      uploadData();
    } else {
      handlealert("Please add at least one Key point", "error");
    }
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <SubHeader title={"Create Course"} FormId={"create-course-form"} />
        <Box sx={{ p: 2, width: {xs: "100%",sm: "95%",md: "90%", lg: "75%", xl: "60%"} }}>
          <form onSubmit={handleCreateCourse} id="create-course-form">
            <Box sx={{mb: 2, display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 2 }}>
              <TextField
                autoFocus
                size="small"
                label={"Title"}
                required
                type="text"
                fullWidth
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    priceRef.current.focus();
                  }
                }}
              ></TextField>
              <TextField
                inputRef={priceRef}
                size="small"
                label={"Price"}
                type="number"
                required
                fullWidth
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              ></TextField>
            </Box>
            <Box sx={{ mb: 2, display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 2  }}>
              <IconTextField
                size="small"
                type="file"
                inputProps={{ accept: "image/jpeg,image/x-png" }}
                label={"Upload Thumbnail"}
                InputLabelProps={{ shrink: true }}
                fullWidth
                // required
                iconEnd={
                  imageProgress ? (
                    <Skeletons type="smallCircularLoader" />
                  ) : null
                }
                onChange={(event) => {
                  setImageUrl(event.target.files[0]);
                }}
              />
              <IconTextField
                size="small"
                placeholder={"trailerUrl"}
                type="file"
                fullWidth
                inputProps={{ accept: "video/mp4" }}
                label={"Upload Trailer"}
                InputLabelProps={{ shrink: true }}
                // required
                iconEnd={
                  videoProgress ? (
                    <Skeletons type="smallCircularLoader" />
                  ) : null
                }
                onChange={(event) => {
                  setTrailerUrl(event.target.files[0]);
                }}
              />
            </Box>
            <Box sx={{ mb: 2, display: "flex", flexDirection: {xs: "column", md: "row"}, gap: 2  }}>
              <TextField
                size="small"
                label={"categories"}
                fullWidth
                value={categories}
                onChange={(event) => {
                  setCategories(event.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    techStackRef.current.focus();
                  }
                }}
              />
              <TextField
                inputRef={techStackRef}
                size="small"
                label={"Tech Stack"}
                fullWidth
                value={techStack}
                onChange={(event) => {
                  setTechStack(event.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    descRef.current.focus();
                  }
                }}
              />
            </Box>
            <Box sx={{ mb: 2, display: "flex" }}>
              <TextField
                inputRef={descRef}
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
            <Box sx={{ display: "flex", justifyContent: {xs: "center", sm: "flex-end"} }}>
              <Button sx={{width: "120px", flexGrow: {xs: "1", sm: "0"}}} variant="contained" size="small" type="submit">
                CREATE
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};
export default CreateCourse;
