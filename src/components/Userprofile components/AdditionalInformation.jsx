import React, { useState, useRef } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { IconTextField } from "../../components/TextField";
import Skeletons from "../../components/Skeleton/Skeletons";
import { storage } from "../../firebase";
import axios from "axios";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";

const AdditionalInformation = ({
  resume,
  setResume,
  githubLink,
  setGithubLink,
  twitterLink,
  setTwitterLink,
  websiteLink,
  setWebsiteLink,
  setAnyChange = { setAnyChange },
}) => {
  const twitterLinkRef = useRef(null);
  const websiteLinkRef = useRef(null);
  const Token = localStorage.getItem("Token");

  const config = {
    headers: { Authorization: `bearer ${Token}` },
  };

  const dispatch = useDispatch();

  const [resumeProgress, setResumeProgress] = useState(false);

  const uploadResume = async () => {
    if (resume?.name) {
      setResumeProgress(true);
      let fileName = `files/${resume?.name + v4()}`;
      const fileRef = ref(storage, fileName);
      await uploadBytes(fileRef, resume).then(() => {
        setResumeProgress(false);
        setAnyChange(false);
      });
      console.log(fileName);
      return fileName;
    }
  };

  const handleResumeUpload = async (postData) => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_URL}user/resume`,
        postData,
        config
      );
      handlealert("Resume updated", "success");
    } catch (err) {
      handlealert("Error, please try again!", "error");
    }
  };

  const updateResume = async () => {
    const postData = {
      resumeLink: await uploadResume(),
    };
    if (postData) {
      handleResumeUpload(postData);
    } else {
    }
  };

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

  return (
    <>
      <Box>
        <form>
          <Typography variant="h6">Additional Information</Typography>
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
                  Upload Resume
                </Typography>
                <IconTextField
                  size="small"
                  type="file"
                  fullWidth
                  iconEnd={
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ ml: 2, p: 0.5, fontSize: "11px" }}
                      onClick={() => updateResume()}
                    >
                      Upload Resume
                    </Button>
                  }
                  iconStart={
                    resumeProgress ? (
                      <Skeletons type="smallCircularLoader" />
                    ) : null
                  }
                  onChange={(event) => {
                    setResume(event.target.files[0]);
                    setAnyChange(false);
                  }}
                />
              </Box>
              {resume !== null ? (
                <Box>
                  <a href={resume} target="_blank" rel="noopener noreferrer">
                    <Button>
                      Click here to view Previously uploaded Resume
                    </Button>
                  </a>
                </Box>
              ) : (
                <></>
              )}
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                >
                  Github Link
                </Typography>
                <IconTextField
                  size="small"
                  type="text"
                  fullWidth
                  value={githubLink}
                  onChange={(e) => {
                    setGithubLink(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      twitterLinkRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                >
                  Twitter Link
                </Typography>
                <IconTextField
                  inputRef={twitterLinkRef}
                  size="small"
                  type="text"
                  fullWidth
                  value={twitterLink}
                  onChange={(e) => {
                    setTwitterLink(e.target.value);
                    setAnyChange(false);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      websiteLinkRef.current.focus();
                    }
                  }}
                ></IconTextField>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "17px", mt: 2, mb: 1 }}
                >
                  Website/Blog Link
                </Typography>
                <IconTextField
                  inputRef={websiteLinkRef}
                  size="small"
                  type="text"
                  fullWidth
                  value={websiteLink}
                  onChange={(e) => {
                    setWebsiteLink(e.target.value);
                    setAnyChange(false);
                  }}
                ></IconTextField>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AdditionalInformation;
