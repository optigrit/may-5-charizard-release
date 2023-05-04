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
import axios from "axios";
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
import { useNavigate } from "react-router-dom";

const ProfessionalInformation = ({
  highestEducationEarned,
  setHighestEducationEarned,
  setAnyChange,
  instituteName,
  setInstituteName,
  instituteType,
  setInstituteType,
  role,
  setRole,
  companyName,
  setCompanyName,
  position,
  setPosition
}) => {
  let isProfessional = false

  if (role === "professional" || role === "other") {
    isProfessional = true
  }

  const userNameRef = useRef(null);
  const mobileRef = useRef(null);
  const addressRef = useRef(null);
  const stateRef = useRef(null);
  const pincodeRef = useRef(null);
  const streetRef = useRef(null);
  const instituteTypeRef = useRef(null);
  const instituteNameRef = useRef(null);
  const studentTypeRef = useRef(null);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <form>
          <Typography variant="h6">Professional Information</Typography>
          <Typography variant="h6" sx={{ fontSize: "14px", color: "#787878" }}>
            You can change it any time you want
          </Typography>
          <Box display="flex" flexDirection={"row"}>
            <Box sx={{ mt: 1, width: "670px" }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                >
                  Highest Education Earned
                </Typography>
                <IconTextField
                  size="small"
                  type="text"
                  fullWidth
                  value={highestEducationEarned}
                  onChange={(e) => {
                    setHighestEducationEarned(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      instituteTypeRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                >
                  Institute Type
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={instituteType}
                    onChange={(e) => {
                      setInstituteType(e.target.value);
                      setAnyChange(false);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        instituteNameRef.current.focus();
                      }
                    }}
                  >
                    <FormControlLabel
                      value="school"
                      control={<Radio size="small" />}
                      label="School"
                      inputRef={instituteTypeRef}
                    />
                    <FormControlLabel
                      value="college"
                      control={<Radio size="small" />}
                      label="College"
                    />
                    <FormControlLabel
                      value="company"
                      control={<Radio size="small" />}
                      label="Company"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                >
                  Institute Name
                </Typography>
                <IconTextField
                  inputRef={instituteNameRef}
                  size="small"
                  type="text"
                  fullWidth
                  value={instituteName}
                  onChange={(e) => {
                    setInstituteName(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      studentTypeRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 3, mb: 1 }}
                >
                  Are you a student or a professional
                </Typography>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setAnyChange(false);
                    }}
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio size="small" />}
                      label="Student"
                      inputRef={studentTypeRef}
                    />
                    <FormControlLabel
                      value="professional"
                      control={<Radio size="small" />}
                      label="Professional"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio size="small" />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {isProfessional ? (
                <>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                  >
                    Company Name
                  </Typography>
                  <IconTextField
                    size="small"
                    type="text"
                    fullWidth
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      setAnyChange(false);
                    }}
                  ></IconTextField>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                    >
                      Position
                    </Typography>
                    <IconTextField
                      size="small"
                      type="text"
                      fullWidth
                      value={position}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        setAnyChange(false);
                      }}
                    ></IconTextField>
                  </Box>
                </>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ProfessionalInformation;
