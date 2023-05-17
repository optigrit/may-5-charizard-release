import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import { IconTextField } from "../../components/TextField";
import Skeletons from "../../components/Skeleton/Skeletons";
import { TextField } from "@mui/material";
import { storage } from "../../firebase";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { MuiTelInput } from "mui-tel-input";
import Product from "../../components/ProductCarousel/Product";
// import { AlertBox } from '../AlertBox';
import { useDispatch, useSelector } from "react-redux";
import { manipulateEditCourse } from "../../Redux/EditCourse/EditCourse-Action";
import { ADD_EDIT_COURSE } from "../../Redux/EditCourse/EditCourse-Constants";
import styled from "styled-components";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Country, State } from "country-state-city";
import Select, { Props as SelectProps, StylesConfig } from "react-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import EditContestCard from "../../components/Admin/Components/EditContestCard";
import zIndex from "@mui/material/styles/zIndex";
import { Email, PhotoCamera } from "@mui/icons-material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField, Unstable_DateField } from "@mui/x-date-pickers/DateField";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";

const PersonalInformation = ({
  email,
  setEmail,
  username,
  setUsername,
  mobile,
  setMobile,
  setAnyChange,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  pinCode,
  setPinCode,
  street,
  setStreet,
  gender,
  setGender,
  dob,
  setDob,
  profilePhotoLink,
  setProfilePhotoLink,
  firstName,
}) => {
  const userNameRef = useRef(null);
  const mobileRef = useRef(null);
  const addressRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);
  const streetRef = useRef(null);
  const genderRef = useRef(null);

  const styles = {
    container: (base) => ({
      ...base,
      flex: 1,
      zIndex: 10,
    }),
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <form>
          <Grid container>
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
              <Typography variant="h6">Personal Information</Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: "14px", color: "#787878" }}
              >
                You can change it any time you want
              </Typography>
              <Box display="flex" flexDirection={"row"}>
                <Box sx={{ mt: 1, width: "670px" }}>
                  {/* <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                >
                  Email
                </Typography>
                <IconTextField
                  size="small"
                  type="email"
                  iconEnd={<AlternateEmailIcon />}
                  fullWidth
                  InputProps={{readOnly: true}}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      userNameRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                >
                  Username
                </Typography>
                <IconTextField
                  inputRef={userNameRef}
                  size="small"
                  type="text"
                  fullWidth
                  InputProps={{readOnly: true}}
                  value={username}
                ></IconTextField>
              </Box> */}

                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                    >
                      Address
                    </Typography>
                    <Box sx={{ mb: 2, display: "flex" }}>
                      <Box mr={2} sx={{ width: "100%" }}>
                        <Select
                          ref={addressRef}
                          options={Country.getAllCountries()}
                          getOptionLabel={(options) => {
                            return options["name"];
                          }}
                          getOptionValue={(options) => {
                            return options["name"];
                          }}
                          value={selectedCountry}
                          onChange={(item) => {
                            setSelectedCountry(item);
                            setAnyChange(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              stateRef.current.focus();
                            }
                          }}
                          placeholder={"Country"}
                          styles={styles}
                        />
                      </Box>

                      <Box mr={2} sx={{ width: "100%" }}>
                        <Select
                          ref={stateRef}
                          options={State?.getStatesOfCountry(
                            selectedCountry?.isoCode
                          )}
                          getOptionLabel={(options) => {
                            return options["name"];
                          }}
                          getOptionValue={(options) => {
                            return options["name"];
                          }}
                          value={selectedState}
                          onChange={(item) => {
                            setSelectedState(item);
                            setAnyChange(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              pincodeRef.current.focus();
                            }
                          }}
                          placeholder={"State"}
                        />
                      </Box>
                      <IconTextField
                        inputRef={pincodeRef}
                        size="small"
                        type="number"
                        label={"Pin Code"}
                        fullWidth
                        value={pinCode}
                        onChange={(e) => {
                          setPinCode(e.target.value);
                          setAnyChange(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            streetRef.current.focus();
                          }
                        }}
                      ></IconTextField>
                    </Box>
                    <Box>
                      <IconTextField
                        inputRef={streetRef}
                        size="small"
                        type="text"
                        label={"Street"}
                        fullWidth
                        value={street}
                        onChange={(e) => {
                          setStreet(e.target.value);
                          setAnyChange(false);
                        }}
                      ></IconTextField>
                    </Box>
                  </Box>
                  <Box mt={3}>
                    <FormControl>
                      <FormLabel sx={{ color: "#000000", fontSize: "20px" }}>
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                          setAnyChange(false);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            genderRef.current.focus();
                          }
                        }}
                      >
                        <FormControlLabel
                          value="Female"
                          control={<Radio size="small" />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="Male"
                          control={<Radio size="small" />}
                          label="Male"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                    >
                      Date of birth (mm/dd/yyy)
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Unstable_DateField
                        value={dob}
                        onChange={(newValue) => {
                          setDob(newValue);
                          setAnyChange(false);
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default PersonalInformation;
