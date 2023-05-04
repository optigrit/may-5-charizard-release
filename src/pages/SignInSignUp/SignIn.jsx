import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IconTextField } from "../../components/TextField";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import googleIcon from "../../assets/SignInSignUp/icon/google-icon 2.svg";
const ALERT_TIME = 5000;

const SignIn = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const passwordRef = useRef(null);

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

  const navigate = useNavigate();

  const LoginApi = async (e) => {
    // e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}signin`,
        userData
      );
      localStorage.setItem("Token", data?.token);
      localStorage.setItem("Username", data?.username);
      // dispatch(manipulateuserdata(ADD_USER_DATA,data?.username))
      if (data.msg === "Incorrect Password") {
        handlealert(data?.msg, "error");
      } else if (data.msg === "please verify by the link you get in mail") {
        handlealert(data?.msg, "error");
      } else if (data?.msg === "please signUp first") {
        handlealert(
          "This email hasn't been registered try signing up",
          "error"
        );
      } else {
        handlealert(data?.msg, "success");
        navigate("/", { replace: true });
      }
    } catch (err) {
      handlealert(err, "error");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const svgIcon = (
    <Icon sx={{ lineHeight: "0.75" }}>
      <img alt="edit" src={googleIcon} />
    </Icon>
  );

  return (
    <>
      <form onSubmit={LoginApi}>
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            m: 0,
            width: { sm: `calc(100%)` },
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
                sx={{
                  mb: 4,
                  pt: { xs: "100px!important", md: "0px!important" },
                }}
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
                  Welcome back!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "400",
                    color: "#a4a4a4",
                    letterSpacing: "1px",
                  }}
                >
                  Please enter your details.
                </Typography>
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
                  autoFocus
                  size="small"
                  label={"Enter your email"}
                  sx={{}}
                  type="text"
                  fullWidth
                  value={userData.email}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      passwordRef.current.focus();
                    }
                  }}
                  onChange={(event) => {
                    setUserData((prevState) => ({
                      ...prevState,
                      email: event.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                pt="0px!important"
                pl="0px!important"
                sx={{ mb: 1.5 }}
              >
                <IconTextField
                  inputRef={passwordRef}
                  size="small"
                  label={"Enter your password"}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={userData.password}
                  onChange={(event) => {
                    setUserData((prevState) => ({
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
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                pt="0px!important"
                pl="0px!important"
                sx={{ mb: 1.5 }}
              >
                {/* <FormControlLabel
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
                /> */}
                <Button
                  sx={{
                    textTransform: "none",
                    p: "0px",
                    px: "8px",
                    height: "28px",
                  }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </Button>
              </Grid>
              <Button
                variant="contained"
                fullWidth
                sx={{ fontWeight: "400" }}
                onClick={() => LoginApi()}
              >
                Sign in
              </Button>
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
                Sign in with Google
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
                  Don't have an account
                </Typography>
                <Link to="/sign-up" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      color: "#698AFF",
                      fontSize: "14px",
                    }}
                  >
                    Sign-Up
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
              fontSize: '55px'
            }}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            OptiGrit
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SignIn;
