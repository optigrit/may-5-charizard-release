import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconTextField } from "../../components/TextField";
import GoogleIcon from "../../assets/SignInSignUp/icon/google-icon.svg";

import Stack from "@mui/material/Stack";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { MuiTelInput } from "mui-tel-input";
import { userAuthAPI } from "../../api/requests/users/userAuthAPI";

function SignUp() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpUserData, setSignUpUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const lastNameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);

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

  const Navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const SignUpApi = async () => {
    setLoader(true);
    try {
      const data = await userAuthAPI.signUp(signUpUserData)
      setMessage(data?.message);
      setOpen(true);
      setLoader(false);
      handlealert("Sign up successfully now sign in", "success");
      Navigate("/sign-in", { replace: true });
    } catch (err) {
      setLoader(false);
      handlealert(err.response?.data, "error");
    }
  };

  const handlePhoneNo = (e) => {
    if (e?.length >= 16) {
    } else {
      setSignUpUserData((prevState) => ({
        ...prevState,
        mobile: e,
      }));
    }
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const svgIcon = (
    <Icon sx={{ lineHeight: "0.75" }}>
      <img alt="edit" src={GoogleIcon} />
    </Icon>
  );
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          flexGrow: 1,
          m: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ py: { xs: "100px", md: "16px" } }}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          <Grid container xs={10} sm={8} md={8} spacing={2}>
            <Grid
              item
              xs={12}
              md={12}
              pl="0px!important"
              sx={{ mb: 4, pt: { xs: "100px!important", md: "0px!important" } }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: "28px",
                  fontWeight: "500",
                  color: "#454545",
                  mb: 0.5,
                }}
              >
                Create your account
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "400",
                  color: "#a4a4a4",
                  letterSpacing: "1px",
                }}
              >
                Enter the fields below to get started.
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              pt="0px!important"
              pl="0px!important"
              sx={{ pr: { md: "8px!important", xs: "0px!important" }, mb: 2.5 }}
            >
              <IconTextField
                autoFocus
                size="small"
                label={"First Name"}
                sx={{}}
                type="text"
                fullWidth
                value={signUpUserData.firstName}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    lastNameRef.current.focus();
                  }
                }}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    firstName: event.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              pt="0px!important"
              sx={{ pl: { md: "8px!important", xs: "0px!important" }, mb: 2.5 }}
            >
              <IconTextField
                inputRef={lastNameRef}
                size="small"
                label={"Last Name"}
                type="text"
                fullWidth
                value={signUpUserData.lastName}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    lastName: event.target.value,
                  }));
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    userNameRef.current.focus();
                  }
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              pt="0px!important"
              pl="0px!important"
              sx={{ mb: 2.5 }}
            >
              <IconTextField
                inputRef={userNameRef}
                size="small"
                label={"Username"}
                type="email"
                fullWidth
                value={signUpUserData.username}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    username: event.target.value,
                  }));
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    emailRef.current.focus();
                  }
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              pt="0px!important"
              pl="0px!important"
              sx={{ mb: 2.5 }}
            >
              <IconTextField
                inputRef={emailRef}
                size="small"
                label={"Email"}
                type="text"
                fullWidth
                value={signUpUserData.email}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    email: event.target.value,
                  }));
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    mobileRef.current.focus();
                  }
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              pt="0px!important"
              pl="0px!important"
              sx={{ mb: 2.5 }}
            >
              <MuiTelInput
                inputRef={mobileRef}
                InputLabelProps={{ shrink: true }}
                size="small"
                label={"Mobile"}
                fullWidth
                value={signUpUserData.mobile}
                onChange={handlePhoneNo}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    passwordRef.current.focus();
                  }
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              pt="0px!important"
              pl="0px!important"
              sx={{ mb: 2.5 }}
            >
              <IconTextField
                inputRef={passwordRef}
                size="small"
                label={"Password"}
                type={showPassword ? "text" : "password"}
                fullWidth
                value={signUpUserData.password}
                onChange={(event) => {
                  setSignUpUserData((prevState) => ({
                    ...prevState,
                    password: event.target.value,
                  }));
                }}
                iconEnd={
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    sx={{
                      fontSize: 20,
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                }
              />
            </Grid>

            {/* <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems="center"
              sx={{ my: 1 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 18,
                        "& .MuiCheckbox-root ": { pt: "0px!important" },
                      },
                    }}
                  />
                }
                label="Remeber Password"
                sx={{
                  "& .MuiTypography-root": { fontSize: 14, color: "#787878" },
                }}
              />
            </Box> */}
            <LoadingButton
              variant="contained"
              fullWidth
              sx={{ fontWeight: "400" }}
              onClick={() => SignUpApi()}
              loading={loader}
            >
              Sign Up
            </LoadingButton>
            {/* <Grid
              item
              xs={12}
              md={12}
              pt="0px!important"
              pl="0px!important"
              sx={{ my: 2 }}
            >
              {" "}
              <Divider orientation="horizontal" flexItem>
                <Typography variant="body2" sx={{ color: "#A0A0A0" }}>
                  OR
                </Typography>
              </Divider>
            </Grid> */}
            {/* <Button
              fullWidth
              variant="outlined"
              startIcon={svgIcon}
              sx={{
                textTransform: "none",
                fontWeight: "400",
                mb: 2,
                borderColor: "#EBEBEB",
                color: "#787878",
              }}
            >
              Sign Up with Google
            </Button> */}

            <Grid
              item
              mt={2}
              xs={12}
              md={12}
              pt="0px!important"
              pl="0px!important"
              display="flex"
            >
              {" "}
              <Typography
                sx={{
                  color: "#787878",
                  fontWeight: "400",
                  fontSize: "14px",
                  mr: 1,
                }}
              >
                Already have an account?
              </Typography>
              <Link to="/sign-in" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{ fontWeight: "500", color: "#698AFF", fontSize: "14px" }}
                >
                  Sign-in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: "16px",
            backgroundColor: "#EBEFFF",
            height: { xs: "400px", md: "100vh" },
            fontSize: "55px",
          }}
          style={{ fontFamily: "Light" }}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          OptiGrit
        </Grid>
      </Grid>
    </>
  );
}

export default SignUp;
