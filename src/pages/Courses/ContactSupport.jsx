import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IconTextField } from "../../components/TextField";
{
  /* // value={signUpUserData.firstName}
            // onChange={(event) => {
            //   setSignUpUserData((prevState) => ({
            //     ...prevState,
            //     firstName: event.target.value,
            //   }));
            // }} */
}
function ContactSupport() {
  return (
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
        sx={{ p: "16px" }}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
      >
        <Grid container xs={12} md={10} spacing={2}>
          <Grid item xs={12} md={12} pt="0px!important" sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: "28px",
                color: "#454545",
                mb: 0.5,
              }}
            >
              Talk with our sales team!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "400",
                color: "#a4a4a4",
                letterSpacing: "1px",
              }}
            >
              Expert guidance for your perfect solution
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} pt="0px!important" sx={{ mb: 2.5 }}>
            <IconTextField
              size="small"
              label={"First Name"}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} pt="0px!important" sx={{ mb: 2.5 }}>
            <IconTextField
              size="small"
              label={"Last Name"}
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} pt="0px!important" sx={{ mb: 2.5 }}>
            <IconTextField
              size="small"
              label={"Company Email"}
              type="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} pt="0px!important" sx={{ mb: 2.5 }}>
            <IconTextField
              size="small"
              label={"Phone Number"}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6} pt="0px!important" sx={{ mb: 2.5 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Company Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="API method"
                name="apiMethod"
                // value={item.apiMethod}
                // onChange={e => handleinputchangeDataapi(e, index)}
              >
                <MenuItem value={"GET"}>1-10 employees</MenuItem>
                <MenuItem value={"POST"}>11-50 employees</MenuItem>
                <MenuItem value={"PUT"}>51-200 employees</MenuItem>
                <MenuItem value={"PATCH"}>201-500 employees</MenuItem>
                <MenuItem value={"DELETE"}>501-1000 employees</MenuItem>
                <MenuItem value={"COPY"}>1001-5000 employees</MenuItem>
                <MenuItem value={"HEAD"}>5001-10,000 employees</MenuItem>
                <MenuItem value={"OPTIONS"}>10,001+ employees</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} pt="0px!important" sx={{ mb: 3 }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Company Headquarters
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="API method"
                name="apiMethod"
                // value={item.apiMethod}
                // onChange={e => handleinputchangeDataapi(e, index)}
              >
                <MenuItem value={"GET"}>1-10 employees</MenuItem>
                <MenuItem value={"POST"}>11-50 employees</MenuItem>
                <MenuItem value={"PUT"}>51-200 employees</MenuItem>
                <MenuItem value={"PATCH"}>201-500 employees</MenuItem>
                <MenuItem value={"DELETE"}>501-1000 employees</MenuItem>
                <MenuItem value={"COPY"}>1001-5000 employees</MenuItem>
                <MenuItem value={"HEAD"}>5001-10,000 employees</MenuItem>
                <MenuItem value={"OPTIONS"}>10,001+ employees</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} pt="0px!important">
            <TextField
              size="small"
              id="outlined-textarea"
              label={"What would you like to discuss?"}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{ p: "16px", bgcolor: "white" }}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
      ></Grid>
    </Grid>
  );
}

export default ContactSupport;
