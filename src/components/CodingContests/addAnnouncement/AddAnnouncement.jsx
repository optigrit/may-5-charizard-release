import React, { useState } from "react";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { TextField, Grid, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../../Redux/UserData/User-Constants";
import { useNavigate } from "react-router-dom";
import { contestAPI } from "../../../api/requests/contestAPI";

const AddAnnouncement = ({ contestId, setOpendia }) => {
  const drawerWidth = 240;

  const [announcement, setAnnouncement] = useState("");
  const [showTill, setShowTill] = useState(dayjs(""));

  const navigate = useNavigate();

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

  const handleChangeShowTill = (newValue) => {
    setShowTill(newValue);
  };


  const postAnnouncement = {
    announcement: announcement,
    showTill: showTill.$d / 1000,
  };

  const addAnnouncement = async () => {
    await contestAPI
      .createAnnouncement(contestId, postAnnouncement)
      .then((data) => {
        handlealert("Announcement added", "success");
        setOpendia(false);
      })
      .catch((err) => {
        handlealert(err?.message, "error");
      });
  };

  return (
    <>
      <Box
        sx={{ mb: 2, display: "flex", p: 2, justifyContent: "center" }}
        width={"100%"}
      >
        <form>
          <TextField
            InputLabelProps={{ shrink: true }}
            size="small"
            sx={{ mt: 1, mb: 3 }}
            id="outlined-basic"
            value={announcement}
            label="Add Announcement"
            variant="outlined"
            type="text"
            fullWidth
            onChange={(event) => setAnnouncement(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              size="small"
              label="Select upto what time and date, the announcement should be visible"
              value={showTill}
              onChange={handleChangeShowTill}
              renderInput={(params) => (
                <TextField size="small" {...params} fullWidth />
              )}
            />
          </LocalizationProvider>

          <Button
            sx={{ mt: 3 }}
            fullWidth
            variant="contained"
            size="small"
            onClick={addAnnouncement}
          >
            Add announcement
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddAnnouncement;
