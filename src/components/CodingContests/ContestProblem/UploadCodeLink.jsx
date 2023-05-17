import React, { useState } from "react";
import { ContainerOfTitle } from "../../../Style/VideoSlider";
import Grid from "@mui/material/Grid";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useOutletContext, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../../Redux/UserData/User-Constants";
import { contestProblemAPI } from "../../../api/requests/contests/contestProblemAPI";

const UploadCodeLink = () => {
  const { id } = useParams();

  const problem = useOutletContext();

  const [solutionLink, setSolutionLink] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [language, setLanguage] = useState("");
  const [githubUsername, setGithubUsername] = useState("");

  function isUrlValid(userInput) {
    var regexQuery =
      "/(http(s)?://.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/";
    var url = new RegExp(regexQuery, "g");
    if (url.test(userInput)) {
      alert("Great, you entered an E-Mail-address");
      return true;
    }
    return false;
  }

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

  const submitSolution = async () => {
    await contestProblemAPI
      .submitSolution(id, dataforpost)
      .then((data) => {
        handlealert("Submitted!", "success");
      })
      .catch((err) => {
        alert("Error submitting!", "error");
      });
  };

  const clearString = () => {
    setSolutionLink("");
  };

  const dataforpost = {
    githubRepo: githubRepo,
    submissionLink: solutionLink,
    language: language,
    githubUsername: githubUsername,
  };

  return (
    <>
      <Accordion
        m={0}
        p={0}
        defaultExpanded={true}
        sx={{
          m: "16px!important",
          mt: "0px!important",
          mr: { xs: "0px!important", md: "0px!important" },
          width: "100%",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: "#FAFCFE",
            minHeight: { xs: "48px!important", md: "58px!important" },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "500", fontSize: { xs: "16px", md: "20px" } }}
          >
            Upload code link here
          </Typography>{" "}
        </AccordionSummary>

        <AccordionDetails sx={{ border: "1px solid #e5e5e5", px: "0px", p: 2 }}>
          <Grid container xs={12} sm={8} md={12} sx={{ m: "auto!important" }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography
                sx={{ fontSize: { xs: "13px", md: "15px" }, fontWeight: "400" }}
                variant="body2"
              >
                Submit your code here in below input and we will get back to you
                thank you
              </Typography>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={12}
                md={2.5}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: "16px!important", xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Paste submission link here"
                  variant="outlined"
                  sx={{
                    borderColor: "grey",
                    "&:hover": {
                      borderColor: "grey",
                    },
                  }}
                  fullWidth
                  onChange={(event) => setSolutionLink(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2.5}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: "16px!important", xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Enter repository link"
                  variant="outlined"
                  sx={{
                    borderColor: "grey",
                    "&:hover": {
                      borderColor: "grey",
                    },
                  }}
                  fullWidth
                  onChange={(event) => setGithubRepo(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2.5}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: "16px!important", xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                <TextField
                  size="small"
                  id="outlined-basic"
                  label="Github username"
                  variant="outlined"
                  sx={{
                    borderColor: "grey",
                    "&:hover": {
                      borderColor: "grey",
                    },
                  }}
                  fullWidth
                  onChange={(event) => setGithubUsername(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2.5}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: "16px!important", xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                {" "}
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select Language
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
                    onChange={(event) => setLanguage(event.target.value)}
                  >
                    {(problem?.languages).map((x, i) => {
                      return (
                        <MenuItem key={i} value={x}>
                          {x}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                pt="0px!important"
                pl="0px!important"
                sx={{ pr: { md: "0px!important", xs: "0px!important" } }}
              >
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  sx={{
                    textAlign: "center",
                    height: 40,
                    color: "white",
                    backgroundColor: "#696969",
                    "&:hover": {
                      backgroundColor: "#000000",
                    },
                  }}
                  onClick={() => {
                    submitSolution();
                    clearString();
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "15px",
                      fontWeight: "200",
                    }}
                    variant="body2"
                  >
                    Submit
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default UploadCodeLink;
