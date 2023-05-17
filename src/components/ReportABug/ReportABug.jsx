import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";
import { bugAPI } from "../../api/requests/bugs/bugAPI";

function ReportABug({ setOpendia }) {
  const [bugDetails, setBugDetails] = useState("");


  const dispatch = useDispatch();
  const ALERT_TIME = 5000;

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

  const postReport = async (e) => {
    e.preventDefault();
    const postData = {
      bugDetails: bugDetails,
    };
    try {
      const data = await bugAPI.reportBug(postData);
      setOpendia(false);
      handlealert("Reported Sucessfully", "success");
    } catch (err) {}
  };

  return (
    <>
      {/* // /const Dialogue = ({opendia,setOpendia,title,content,handleChange,i,id}) => { */}
      <Box sx={{ mb: 2, display: "flex", p: 2 }} width={"100%"}>
        <form onSubmit={postReport} style={{ width: "100%" }}>
          <TextField
            size="small"
            id="outlined-textarea"
            label={"Bug Report"}
            multiline
            rows={2}
            fullWidth
            value={bugDetails}
            onChange={(event) => {
              setBugDetails(event.target.value);
            }}
          />
          <Button
            type="submit"
            disabled={!bugDetails}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}

export default ReportABug;
