import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Badge,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  useMediaQuery,
} from "@mui/material";
import { TextField } from "@mui/material";
import { storage } from "../../firebase";
import axios from "axios";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import { Email, PhotoCamera } from "@mui/icons-material";
import "react-multi-carousel/lib/styles.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField, Unstable_DateField } from "@mui/x-date-pickers/DateField";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";
import { IconTextField } from "../TextField";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { MuiTelInput } from "mui-tel-input";

const UserInformation = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  setAnyChange,
  gender,
  setGender,
  dob,
  setDob,
  profilePhotoLink,
  setProfilePhotoLink,
  email,
  setEmail,
  username,
  setUsername,
  mobile,
  setMobile,
}) => {
  const [isPhoto, SetIsPhoto] = useState(false);
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);
  const genderRef = useRef(null);

  const dispatch = useDispatch();

  const Token = localStorage.getItem("Token");

  const config = {
    headers: { Authorization: `bearer ${Token}` },
  };

  const uploadImage = async () => {
    let fileName = `files/${profilePhotoLink?.name + v4()}`;
    const fileRef = ref(storage, fileName);
    await uploadBytes(fileRef, profilePhotoLink).then(() => {
      setAnyChange(false);
    });
    return fileName;
  };

  const handleImageUpload = async (postData) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_URL}user/image`,
        postData,
        config
      );
      handlealert("Image updated", "success");
    } catch (err) {
      handlealert("Error, please try again!", "error");
    }
  };

  const updateImage = async () => {
    const postData = {
      profilePhotoLink: await uploadImage(),
    };
    if (postData) {
      handleImageUpload(postData);
    } else {
    }
  };

  const ALERT_TIME = 5000;

  const matchProfile = useMediaQuery("(max-width:900px)");

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

  const userNameRef = useRef(null);
  const mobileRef = useRef(null);
  const addressRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);
  const streetRef = useRef(null); 

  if (isPhoto === true) {
    updateImage();
    SetIsPhoto(false);
  }

  return (
    <>
      <Box sx={{ p: 2 }}>
        <form>
          <Typography variant="h6">User Information</Typography>
          <Typography variant="h6" sx={{ fontSize: "14px", color: "#787878" }}>
            You can change it any time you want
          </Typography>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ paddingTop: "0px!important", bgcolor: "" }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ paddingTop: "0px!important", bgcolor: "" }}
                >
                  <Box
                    sx={{
                      lg: { mr: 2 },
                      xl: { mr: 2 },
                      xs: { mr: 0 },
                      md: { mr: 0 },
                      mr: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                    >
                      First Name
                    </Typography>
                    <TextField
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      fullWidth
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setAnyChange(false);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          lastNameRef.current.focus();
                        }
                      }}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ paddingTop: "0px!important", bgcolor: "" }}
                >
                  <Box mr={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "17px",
                        mt: 2,
                        mb: 1,
                        md: { mr: 1 },
                        lg: { mr: 1 },
                      }}
                    >
                      Last Name
                    </Typography>
                    <TextField
                      inputRef={lastNameRef}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      fullWidth
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setAnyChange(false);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          dobRef.current.focus();
                        }
                      }}
                    ></TextField>
                  </Box>
                </Grid>
                <Grid item>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                    >
                      Email
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "#e5e5e5",
                        p: 1,
                        backgroundColor: "#e5e5e5",
                        borderRadius: 1,
                      }}
                    >
                      {email}
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                    >
                      Username
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "#e5e5e5",
                        p: 1,
                        backgroundColor: "#e5e5e5",
                        borderRadius: 1,
                      }}
                    >
                      {username}
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                    >
                      Mobile
                    </Typography>
                    {/* <MuiTelInput
                      inputRef={mobileRef}
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      fullWidth
                      value={mobile}
                      InputProps={{readOnly: true, }}
                      onChange={(newPhone) => {
                        setMobile(newPhone);
                        setAnyChange(false);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addressRef.current.focus();
                        }
                      }}
                    /> */}
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "#e5e5e5",
                        p: 1,
                        backgroundColor: "#e5e5e5",
                        borderRadius: 1,
                      }}
                    >
                      {mobile}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingTop: "0px!important",
                bgcolor: "",
                align: "right",
                md: { mt: 1 },
              }}
            >
              <Grid
                container
                sx={{ justifyContent: "right" }}
                direction={"row-reverse"}
              >
                <Grid item xl={12} lg={12} md={6} xs={6}>
                  <Typography
                    variant="h6"
                    sx={{
                      xs: { mr: 0 },
                      md: { mr: 2 },
                      lg: { mr: 3 },
                      xl: { mr: 3 },
                    }}
                  >
                    Profile Photo
                  </Typography>
                </Grid>
                <Grid item xl={12} lg={12} md={12} xs={6}>
                  <Grid
                    container
                    direction={matchProfile === true ? "row-reverse" : "row"}
                  >
                    <Grid item>
                      <Badge
                        sx={{
                          xs: { ml: 10 },
                          md: { ml: 17 },
                          lg: { ml: 17 },
                          xl: { ml: 17 },
                          mt: 2,
                        }}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <IconButton
                            sx={{ width: 48, height: 48 }}
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={(event) => {
                                setProfilePhotoLink(event.target.files[0]);
                                SetIsPhoto(true);
                                setAnyChange(false);
                              }}
                            />
                            <PhotoCamera
                              sx={{
                                // xs: { width: 40, height: 40 },
                                // md: { width: 47, height: 47 },
                                // lg: { width: 56, height: 56 },
                                // xl: { width: 56, height: 56 },
                                width: { xs: 35, md: 50, lg: 56 },
                                height: { xs: 35, md: 50, lg: 56 },
                                backgroundColor: "white",
                                borderRadius: "100%",
                                p: 0.5,
                              }}
                            />
                          </IconButton>
                          // <CameraAltOutlinedIcon sx={{ width: 48, height: 48, backgroundColor: "#698AFF", p: 1.5, borderRadius: "100%", color: "#ffffff" }} />
                        }
                      >
                        <Avatar
                          sx={{
                            fontSize: "50px",
                            color: "#698AFF",
                            backgroundColor: "#DFE6FF",
                            // xs: { height: 130, width: 130 },
                            // md: { height: 300, width: 300 },
                            // lg: { height: 500, width: 500 },
                            // xl: { height: 500, width: 500 },
                            height: { xs: 80, sm: 90, md: 122, lg: 132 },
                            width: { xs: 80, sm: 90, md: 122, lg: 132 },
                          }}
                          alt={firstName}
                          src={profilePhotoLink}
                        />
                      </Badge>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default UserInformation;
