import React, { useState, useRef } from "react";
import { Box } from "@mui/system";
import { TextField, Grid, Button, Typography } from "@mui/material";
import { IconTextField } from "../../TextField";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams, Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { manipulateuserdata } from "../../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../../Redux/UserData/User-Constants";
import { useDispatch } from "react-redux";
import SubHeader from "../../SideBarResponsive/SubHeader";
import { contestProblemAPI } from "../../../api/requests/contests/contestProblemAPI";

const CreateProblem = () => {
  const [inputTags, setinputTags] = useState([""]);
  const [inputAuthors, setinputAuthors] = useState([""]);
  const [inputInfo, setinputInfo] = useState([""]);
  const [inputHints, setinputHints] = useState([""]);
  const [inputSamplevids, setinputSamplevids] = useState([""]);
  const [inputConstraints, setinputConstraints] = useState([""]);
  const [inputDataapis, setinputDataapis] = useState([""]);
  const [testcases, setTestcases] = useState([""]);
  const [statement, setStatement] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [title, setTitle] = useState("");
  const [solution, setSolution] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [code, setCode] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [maxScore, setMaxScore] = useState();
  const [Api, setApi] = useState([
    { apiMethod: "", link: "", description: "" },
  ]);

  const problemCodeRef = useRef(null);
  const difLevelRef = useRef(null);
  const solutionRef = useRef(null);

  const handleinputchangeTag = (e, index) => {
    const tag = [...inputTags];
    tag[index] = e.target.value;
    setinputTags(tag);
  };

  const handleremoveTag = (index) => {
    if (inputTags.length > 1) {
      const tag = [...inputTags];
      tag.splice(index, 1);
      setinputTags(tag);
    }
  };

  const handleaddclickTag = () => {
    const trimed = inputTags.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setinputTags([...inputTags, ""]);
    }
  };

  const handleinputchangeAuthor = (e, index) => {
    const author = [...inputAuthors];
    author[index] = e.target.value;
    setinputAuthors(author);
  };

  const handleremoveAuthor = (index) => {
    if (inputAuthors.length > 1) {
      const author = [...inputAuthors];
      author.splice(index, 1);
      setinputAuthors(author);
    }
  };

  const handleaddclickAuthor = () => {
    const trimed = inputAuthors.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setinputAuthors([...inputAuthors, ""]);
    }
  };

  const handleinputchangeInfo = (e, index) => {
    const info = [...inputInfo];
    info[index] = e.target.value;
    setinputInfo(info);
  };

  const handleremoveInfo = (index) => {
    if (inputInfo.length > 1) {
      const info = [...inputInfo];
      info.splice(index, 1);
      setinputInfo(info);
    }
  };

  const handleaddclickInfo = () => {
    const trimed = inputInfo.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setinputInfo([...inputInfo, ""]);
    }
  };

  const handleinputchangeHint = (e, index) => {
    const hint = [...inputHints];
    hint[index] = e.target.value;
    setinputHints(hint);
  };

  const handleremoveHint = (index) => {
    if (inputHints.length > 1) {
      const hint = [...inputHints];
      hint.splice(index, 1);
      setinputHints(hint);
    }
  };

  const handleaddclickHint = () => {
    const trimed = inputHints.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setinputHints([...inputHints, ""]);
    }
  };

  const handleinputchangeSamplevid = (e, index) => {
    const samplevid = [...inputSamplevids];
    samplevid[index] = e.target.value;
    setinputSamplevids(samplevid);
  };

  const handleremoveSamplevid = (index) => {
    if (inputSamplevids.length > 1) {
      const samplevid = [...inputSamplevids];
      samplevid.splice(index, 1);
      setinputSamplevids(samplevid);
    }
  };

  const handleaddclickSamplevid = () => {
    const trimed = inputSamplevids.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setinputSamplevids([...inputSamplevids, ""]);
    }
  };

  const handleinputchangeConstraint = (e, index) => {
    const constraint = [...inputConstraints];
    constraint[index] = e.target.value;
    setinputConstraints(constraint);
  };

  const handleremoveConstraint = (index) => {
    if (inputConstraints.length > 1) {
      const constraint = [...inputConstraints];
      constraint.splice(index, 1);
      setinputConstraints(constraint);
    }
  };

  const handleaddclickConstraint = () => {
    const trimed = inputConstraints.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setinputConstraints([...inputConstraints, ""]);
    }
  };

  const handleinputchangeDataapi = (e, index) => {
    const { name, value } = e.target;
    const list = [...Api];
    list[index][name] = value;
    setApi(list);
    let combine =
      String(list[index].apiMethod) +
      " " +
      String(list[index].link) +
      " " +
      String(list[index].description);
    const dataapi = [...inputDataapis];
    dataapi[index] = combine;
    setinputDataapis(dataapi);
  };

  const handleremoveDataapi = (index) => {
    if (inputDataapis.length > 1) {
      const list = [...Api];
      list.splice(index, 1);
      setApi(list);
      const dataapi = [...inputDataapis];
      dataapi.splice(index, 1);
      setinputDataapis(dataapi);
    }
  };

  const handleaddclickDataapi = () => {
    const trimed = inputDataapis.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setApi([...Api, { apiMethod: "", link: "", description: "" }]);
      setinputDataapis([...inputDataapis, ""]);
    }
  };

  const handleinputchangeTestCase = (e, index) => {
    const testcase = [...testcases];
    testcase[index] = e.target.value;
    setTestcases(testcase);
  };

  const handleremoveTestcase = (index) => {
    if (testcases.length > 1) {
      const testcase = [...testcases];
      testcase.splice(index, 1);
      setTestcases(testcase);
    }
  };

  const handleaddclickTestcase = () => {
    const trimed = testcases.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setTestcases([...testcases, ""]);
    }
  };

  const handleinputchangeStatement = (e, index) => {
    const statemen = [...statement];
    statemen[index] = e.target.value;
    setStatement(statemen);
  };

  const handleremoveStatement = (index) => {
    if (statement.length > 1) {
      const statemen = [...statement];
      statemen.splice(index, 1);
      setStatement(statemen);
    }
  };

  const handleaddclickStatement = () => {
    const trimed = statement.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setStatement([...statement, ""]);
    }
  };

  const handleinputchangeLanguage = (e, index) => {
    const language = [...languages];
    language[index] = e.target.value;
    setLanguages(language);
  };

  const handleremoveLanguage = (index) => {
    if (languages.length > 1) {
      const language = [...languages];
      language.splice(index, 1);
      setLanguages(language);
    }
  };

  const handleaddclickLanguage = () => {
    const trimed = languages.map((item) => {
      return item.trim();
    });
    if (trimed.includes("", trimed)) {
      alert("This field should not be empty");
    } else {
      setLanguages([...languages, ""]);
    }
  };

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

  const addProblem = async () => {
    await contestProblemAPI
      .createProblem(params.contestId, dataforpost)
      .then((data) => {
        handlealert("Problem created!", "success");
        window.location.reload();
      })
      .catch((err) => {
        handlealert("Error", "error");
      });
  };

  const addProblemAndGoToHome = async () => {
    await contestProblemAPI
      .createProblem(params.contestId, dataforpost)
      .then((data) => {
        handlealert("Problem created!", "success");
        navigate(`/contest`, { replace: true });
      })
      .catch((err) => {
        handlealert("Error", "error");
      });
  };

  const dataforpost = {
    title: title,
    dataApis: inputDataapis,
    constraints: inputConstraints,
    sampleVideo: inputSamplevids,
    explaination: testcases,
    moreInfo: inputInfo,
    author: inputAuthors,
    code: code,
    hints: inputHints,
    solution: solution,
    discussion: discussion,
    tags: inputTags,
    statement: statement,
    difficultyLevel: difficultyLevel,
    maximumScore: maxScore,
    languages: languages,
  };

  const drawerWidth = 240;

  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <form>
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
            m: 0,
            // width: "100%",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Grid xs={12} md={12}>
            <SubHeader
              title={"Create Problem"}
              addProblemFun={addProblem}
              addProblemAndGoToHomeFun={addProblemAndGoToHome}
              SaveAndCreateBtn={"Save and Create another problem"}
              SaveAndGoBtn={"Save and go to home"}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={9}
            lg={6}
            sx={{
              py: { xs: "32px!important", md: "16px!important" },
              pr: { xs: "16px", md: "0px" },
            }}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            <Grid container xs={11} md={12}>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: "8px!important", xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                <TextField
                  sx={{ mr: 2 }}
                  size="small"
                  required
                  id="outlined-basic"
                  label="Problem title"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(event) => setTitle(event.target.value)}
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      problemCodeRef.current.focus();
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                sx={{
                  pl: { md: "8px!important", xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                <TextField
                  size="small"
                  required
                  id="outlined-basic"
                  label="Problem Code"
                  variant="outlined"
                  type="text"
                  fullWidth
                  onChange={(event) => setCode(event.target.value)}
                  inputRef={problemCodeRef}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      difLevelRef.current.focus();
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { md: "8px!important", xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Difficulty Level
                  </InputLabel>
                  <Select
                    required
                    inputRef={difLevelRef}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={difficultyLevel}
                    label="Difficulty Level"
                    onChange={(event) => setDifficultyLevel(event.target.value)}
                  >
                    <MenuItem value={"EASY"}>Easy</MenuItem>
                    <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                    <MenuItem value={"HARD"}>Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                pt="0px!important"
                sx={{
                  pl: { md: "8px!important", xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                <TextField
                  required
                  size="small"
                  id="outlined-basic"
                  label="Maximum score"
                  variant="outlined"
                  type="text"
                  fullWidth
                  onChange={(event) => setMaxScore(event.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      solutionRef.current.focus();
                    }
                  }}
                />
              </Grid>
              {/* <Grid
                item
                xs={12}
                md={12}
                pt="0px!important"
                pl="0px!important"
                sx={{
                  pr: { xs: "0px!important" },
                  mb: 2.5,
                }}
              >
                <TextField
                required
                  inputRef={solutionRef}
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  label="Solution"
                  variant="outlined"
                  type="text"
                  onChange={(event) => setSolution(event.target.value)}
                />
              </Grid> */}
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Data Apis
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  Add data apis
                </Typography>
                {Api?.map((item, index) => {
                  return (
                    <>
                      <Box sx={{ mb: 2, display: "flex" }}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          mr={2}
                          sx={{ width: "720px" }}
                        >
                          <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              API Method
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="API method"
                              name="apiMethod"
                              value={item.apiMethod}
                              onChange={(e) =>
                                handleinputchangeDataapi(e, index)
                              }
                            >
                              <MenuItem value={"GET"}>GET</MenuItem>
                              <MenuItem value={"POST"}>POST</MenuItem>
                              <MenuItem value={"PUT"}>PUT</MenuItem>
                              <MenuItem value={"PATCH"}>PATCH</MenuItem>
                              <MenuItem value={"DELETE"}>DELETE</MenuItem>
                              <MenuItem value={"COPY"}>COPY</MenuItem>
                              <MenuItem value={"HEAD"}>HEAD</MenuItem>
                              <MenuItem value={"OPTIONS"}>OPTIONS</MenuItem>
                              <MenuItem value={"LINK"}>LINK</MenuItem>
                              <MenuItem value={"UNLINK"}>UNLINK</MenuItem>
                              <MenuItem value={"PURGE"}>PURGE</MenuItem>
                              <MenuItem value={"LOCK"}>LOCK</MenuItem>
                              <MenuItem value={"UNLOCK"}>UNLOCK</MenuItem>
                              <MenuItem value={"PROPFIND"}>PROPFIND</MenuItem>
                              <MenuItem value={"VIEW"}>VIEW</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="column"
                          sx={{ width: "720px" }}
                        >
                          <Box>
                            <TextField
                              size="small"
                              type="text"
                              fullWidth
                              id="outlined-basic"
                              name="link"
                              label="API Link"
                              variant="outlined"
                              value={item.link}
                              onChange={(e) =>
                                handleinputchangeDataapi(e, index)
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                      <TextField
                        sx={{ mb: 1 }}
                        size="small"
                        type="text"
                        fullWidth
                        id="outlined-basic"
                        name="description"
                        label="API Description"
                        variant="outlined"
                        value={item.description}
                        onChange={(e) => handleinputchangeDataapi(e, index)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickDataapi}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add Additional Apis
                        </Button>
                        {Api.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveDataapi(index)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Enter Tags
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  Tags will be shown in list
                </Typography>
                {inputTags?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"Tags"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeTag(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickTag}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more tags
                        </Button>
                        {inputTags.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveTag(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Enter Constarints
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  Constraints will be shown in list
                </Typography>
                {inputConstraints?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"Constraint"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeConstraint(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickConstraint}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more constraints
                        </Button>
                        {inputConstraints.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveConstraint(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Authors
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  Authors will be shown in list
                </Typography>
                {inputAuthors?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"Author"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeAuthor(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickAuthor}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more authors
                        </Button>
                        {inputAuthors.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveAuthor(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Enter Sample Videos
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  Sample video links will be shown in list
                </Typography>
                {inputSamplevids?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"Sample Video Link"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeSamplevid(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickSamplevid}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more video links
                        </Button>
                        {inputSamplevids.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveSamplevid(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Hints
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  All the hints will be shown in list
                </Typography>
                {inputHints?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"Hint"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeHint(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickHint}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more hints
                        </Button>
                        {inputHints.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveHint(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Provide more information related to the problem
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  Info entered will be shown in list
                </Typography>
                {inputInfo?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"Info"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeInfo(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickInfo}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more additional info
                        </Button>
                        {inputInfo.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveInfo(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Enter languages the problem is allowed to be coded in
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  All languages will be shown in list
                </Typography>
                {languages?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"Language"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeLanguage(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickLanguage}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more languages
                        </Button>
                        {languages.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveLanguage(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Enter sample testcases
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  All testcases will be shown in list
                </Typography>
                {testcases?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"Testcase"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeTestCase(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickTestcase}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more sample testcases
                        </Button>
                        {testcases.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveTestcase(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mb: 2.5, p: 2, pb: 0, backgroundColor: "#F9F9F9" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: "18px", color: "#474747" }}
                >
                  Provide problem statement points
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, mb: 2.5, color: "#787878" }}
                >
                  Statement points will be shown in list
                </Typography>
                {statement?.map((item, i) => {
                  return (
                    <>
                      <IconTextField
                        sx={{ mb: 2, backgroundColor: "white" }}
                        size="small"
                        label={"TStatement"}
                        fullWidth
                        value={item}
                        onChange={(e) => handleinputchangeStatement(e, i)}
                      />
                      <Box display={"flex"} justifyContent="space-between">
                        <Button
                          size="small"
                          onClick={handleaddclickStatement}
                          sx={{ textTransform: "none", mb: 2 }}
                        >
                          <AddIcon
                            sx={{
                              color: "#698AFF",
                              fontSize: 16,
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          Add more statements
                        </Button>
                        {statement.length > 1 ? (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleremoveStatement(i)}
                            sx={{ textTransform: "none", mb: 2 }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Link style={{ textDecoration: 'none' }} to={`/admin/${params.contestId}`}> */}
        {/* </Link> */}
      </form>
    </>
  );
};

export default CreateProblem;
