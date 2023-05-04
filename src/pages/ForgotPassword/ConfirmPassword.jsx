import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconTextField } from "../../components/TextField";
function ConfirmPass() {
  const [confirmPass, setConfirmPass] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isMatched, setIsMatched] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  let { id } = useParams();

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
  const navigate = useNavigate();
  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    if (confirmPass.password === confirmPass.confirmPassword) {
      setIsMatched(false);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}resetpassword/${id}`,
          { password: confirmPass.confirmPassword }
        );
        handlealert("Password changed now try signing in", "success");
        navigate("/sign-in", { replace: true });
      } catch (err) {
        // handlealert(err?.msg,"error")
      }
    } else {
      setIsMatched(true);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleConfirmPassword}>
      <Grid
        container
        spacing={2}
        sx={{
          m: 0,
          width: { sm: `calc(100%)` },
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ p: "16px" }}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          <Grid container xs={10} sm={6} md={8} lg={6}>
            <Grid
              item
              xs={12}
              md={12}
              pl="0px!important"
              sx={{
                mb: 4,
              }}
            >
              {" "}
              <Typography
                variant="h5"
                sx={{
                  fontSize: "28px",
                  fontWeight: "500",
                  color: "#454545",
                  mb: 0.5,
                }}
              >
                Set new password
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "400",
                  color: "#a4a4a4",
                  letterSpacing: "0.5px",
                  mt: 2,
                }}
              >
                Your new password must be diffrent to previously used password.
              </Typography>
            </Grid>
            <IconTextField
              error={isMatched ? true : false}
              size="small"
              label={"Password"}
              type={showPassword ? "text" : "password"}
              fullWidth
              value={confirmPass.password}
              onChange={(event) => {
                setConfirmPass((prevState) => ({
                  ...prevState,
                  password: event.target.value,
                }));
              }}
            />
            <IconTextField
              error={isMatched ? true : false}
              size="small"
              label={"Confirm password"}
              sx={{ mt: 2.5 }}
              type={showPassword ? "text" : "password"}
              fullWidth
              value={confirmPass.confirmPassword}
              onChange={(event) => {
                setConfirmPass((prevState) => ({
                  ...prevState,
                  confirmPassword: event.target.value,
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
              helperText={
                isMatched
                  ? "Password should be same in confirm password."
                  : null
              }
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ fontWeight: "400", mt: 2, textTransform: "none" }}
              // onClick={() => ForgotPasswordEmail()}
              type="submit"
              disabled={!confirmPass.password || !confirmPass.confirmPassword}
            >
              Reset password
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ p: "16px", backgroundColor: "#EBEFFF" }}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          image
        </Grid>
      </Grid>
    </form>
  );
}

export default ConfirmPass;
