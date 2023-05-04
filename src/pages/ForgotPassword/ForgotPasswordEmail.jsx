import { async } from "@firebase/util";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";

function ForgotPasswordEmail() {
  const [email, setEmail] = useState("");
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

  const EmailSent = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}requestupdate`,
        { email }
      );
      handlealert(data?.message, "success");
    } catch (err) {
      handlealert("This email hasn't been registered try signing up", "error");
    }
  };
  return (
    <form onSubmit={EmailSent}>

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
          <Grid container xs={10} sm={6} md={8} lg={6} >
            <Grid
              item
              xs={12}
              md={12}
              pl="0px!important"
              sx={{
                mb: 4,
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
                Forgot your password?
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
                Enter your email address and we will share a link to create a
                new password.
              </Typography>
            </Grid>
            <TextField
              size="small"
              label={"Enter your email"}
              type="text"
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></TextField>
            <Button
              variant="contained"
              fullWidth
              sx={{ fontWeight: "400", mt: 2, textTransform: "none" }}
              // onClick={() => ForgotPasswordEmail()}
              type="submit"
              disabled={!email}
            >
              Send
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

export default ForgotPasswordEmail;
