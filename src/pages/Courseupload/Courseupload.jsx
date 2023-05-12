import React, { useState } from "react";
import Dropzonevideo from "../../components/Dropzonevid/Dropzonevideo";
import Dropzonereso from "../../components/Dropzonereso/Dropzonereso";
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  TextField,
  Fab,
  Tooltip,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SideBarResponsive from "../../components/SideBarResponsive/index";
import { useNavigate, useParams } from "react-router-dom";
import edit from "../../assets/courseVideosUpload/editvideos.svg";
import EditIcon from "@mui/icons-material/Edit";
import del from "../../assets/courseVideosUpload/delete.svg";
import files from "../../assets/courseVideosUpload/files.svg";
import loader from "../../assets/courseVideosUpload/loader1.gif";
import { useEffect } from "react";
import Dialogue from "../../components/Dialogbox/Dialogue";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import axios from "axios";
import Dropzone from "react-dropzone";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import Updatevideo from "../../components/Dropzonevid/Updatevideo";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";

const Courseupload = () => {
  const [togglemenu, setTogglemenu] = useState(false);
  const [module, setModule] = useState(false);
  const [editvid, setEditvid] = useState(false);
  const [addmodule, setAddmodule] = useState(false);
  const [title, setTitle] = useState("");
  const [modtitle, setModtitle] = useState("");
  const [editid, setEditid] = useState();
  const [editvidid, setEditvidid] = useState();
  const [vidname, setVidname] = useState();
  const [viddesc, setViddesc] = useState();
  const [chooseid, setChooseid] = useState();
  const [diaid, setDiaid] = useState(); // section dialog id
  const [ddiaid, setDdiaid] = useState(); // video dialog id
  const [choose, setChoose] = useState();
  const [accept, setAccept] = useState([]);
  const [opendia, setOpendia] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [addresoid, setAddresoid] = useState();
  const [videoindex, setVideoindex] = useState();
  const [chooseindex, setChooseindex] = useState();
  const [chooseresoname, setChooseresoname] = useState();
  const [choosename, setChoosename] = useState();
  const [loading, setLoading] = useState(null);
  const [resoloading, setresoLoading] = useState(true);
  const [resoloaderindex, setresoLoaderindex] = useState(null);
  const [loaderindex, setLoaderindex] = useState();
  const [userdata, setUserdata] = useState();
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(false);
  const [modules, setModules] = useState([]);
  const [index, setIndex] = useState(modules?.length - 1);

  const navigate = useNavigate();

  const handlemod = (value) => {
    setModule(!module);
    setEditid(value);
    setAddmodule(false);
  };

  const Token = localStorage.getItem("Token");

  const config = {
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-type": "application/json",
    },
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

  let { id } = useParams();
  const createsec = async () => {
    try {
      setAddmodule(false);
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}section/${id}`,
        { sectionTitle: modtitle, sectionDescription: "" },
        config
      );
      const newdata = { ...data[0], videosData: [] };
      setModules([...modules, newdata]);
    } catch (err) {}
  };

  const delsec = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}section/${chooseid}`,
        config
      );
    } catch (err) {}
  };

  const delvideo = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}video/${ddiaid}`,
        config
      );
    } catch (err) {}
  };

  const handleDelete = (value) => {
    setChoose(false);
    setOpendia(false);
    setChooseindex(null);
    setChoosename("No section selected");
    delsec();
    modules.splice(value, 1);
  };

  const handledelvid = (value, index) => {
    setOpendia(false);
    delvideo();
    modules[value].videosData.splice(index, 1);
  };

  const getdata = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}course/${id}`,
        config
      );
      return data;
    } catch (error) {}
  };
  const updateState = (data) => {
    setModules(data.data.courseVideos);
    setUserdata(data.data.courseData);
  };

  useEffect(() => {
    getdata().then(
      (data) => updateState(data),
      (error) => {
        handlealert("Data Fetching error", "error");
        setErrorFetchedChecker((c) => !c);
      }
    );
  }, [errorFetchedChecker]);

  const [fileUpload, setFileUpload] = useState(null);
  const uploadFile = async () => {
    let filename = `extrafiles/${fileUpload?.name + v4()}`;
    const postdata = {
      fileName: fileUpload?.name,
      fileUrl: filename,
      fileSize: fileUpload?.size,
    };
    if (fileUpload === null) {
      return null;
    }
    const fileRef = ref(storage, filename);
    await uploadBytes(fileRef, fileUpload);
    setresoLoading(false);
    setFileUpload(null);
    return postdata;
  };
  const normal = async (postdata) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}file/${addresoid}`,
        postdata,
        config
      );

      modules[chooseindex].videosData[videoindex].extraFiles[
        modules[chooseindex].videosData[videoindex].extraFiles.length - 1
      ].id = data[0].id;
      modules[chooseindex].videosData[videoindex].extraFiles[
        modules[chooseindex].videosData[videoindex].extraFiles.length - 1
      ].fileUrl = data[0].fileUrl;
    } catch (err) {
      handlealert("Please upload again!", "error");
    }
  };
  const uploaddata = async () => {
    const postdata = await uploadFile();
    if (postdata) {
      normal(postdata);
    }
  };
  useEffect(() => {
    uploaddata();
  }, [fileUpload]);

  const updatesection = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_URL}section/${chooseid}`,
        { sectionTitle: title },
        config
      );
    } catch (err) {
      handlealert("Please update again!", "error");
    }
  };

  const handleupdate = (index) => {
    setModule(false);
    updatesection();
    modules[index].sectionTitle = title;
  };

  const updatevideos = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_URL}video/${editvidid}`,
        { videoTitle: vidname, videoDescription: viddesc },
        config
      );
    } catch (err) {}
  };

  const handlevidupdate = (index) => {
    setEditvid(false);
    updatevideos();
    modules[chooseindex].videosData[index].videoTitle = vidname;
  };
  const handleviddescupdate = (index) => {
    setEditvid(false);
    updatevideos();
    modules[chooseindex].videosData[index].videoDescription = viddesc;
  };

  return (
    <Box p={3} sx={{ paddingBottom: "0px" }}>
      <Stack spacing={3} direction="row">
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Box sx={{ position: "absolute", top: "35px", left: "35px" }}>
            <Fab color="primary" sx={{ width: "44px", height: "44px" }}>
              <MenuIcon
                sx={{ cursor: "pointer", color: "white" }}
                onClick={() => {
                  setTogglemenu(true);
                }}
              />
            </Fab>
            {togglemenu && (
              <Box onClick={() => setTogglemenu(false)}>
                <SideBarResponsive />
              </Box>
            )}
          </Box>
          <Box
            onClick={() => setTogglemenu(false)}
            sx={{
              width: "1135px",
              border: "1px dashed rgba(0, 0, 0, 0.40)",
              height: "500px",
              borderRadius: "12px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginTop: "1rem",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Stack direction="column" sx={{ alignItems: "center" }}>
                <Typography
                  variant="h5"
                  sx={{ color: "#292929", fontWeight: "600" }}
                >
                  Upload your files
                </Typography>
                <Typography sx={{ color: "#A0A0A0" }}>
                  Files should be mp4
                </Typography>
                <Typography sx={{ color: "#505050" }}>{choosename}</Typography>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Stack
                  spacing={1}
                  sx={{ overflow: "scroll", maxHeight: "350px" }}
                >
                  {modules[chooseindex]?.videosData?.map((file, index) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid rgba(0,0,0,0.06)",
                        backgroundColor: "#FAFAFA",
                        borderRadius: "8px",
                        padding: "12px 10px ",
                        height: "fit-content",
                      }}
                      onClick={() => {
                        setChooseresoname(file.videoTitle);
                        setVideoindex(index);
                      }}
                    >
                      <Stack direction="row" spacing={0.5} key={file.id}>
                        <VideoFileIcon
                          color="primary"
                          sx={{ width: "35px", height: "35px" }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "900px",
                          }}
                        >
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography
                              sx={{ fontSize: "12px", color: "#1E1E1E" }}
                            >
                              {file.videoTitle}
                            </Typography>
                            <Box sx={{ display: "flex", gap: "8px" }}>
                              {loading && loaderindex === index && (
                                <img src={loader} alt="" />
                              )}
                            </Box>
                          </Box>
                          {!(loading && loaderindex === index) && (
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <Updatevideo
                                videoindex={index}
                                setModules={setModules}
                                setProgress={setProgress}
                                videoid={file.id}
                                id={chooseindex}
                                modules={modules}
                                secid={chooseid}
                                setLoading={setLoading}
                                setLoaderindex={setLoaderindex}
                                setEditvid={setEditvid}
                              />
                              <Tooltip title="Edit video details">
                                <img
                                  src={edit}
                                  alt="edit"
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setEditvid(!editvid);
                                    setEditvidid(file.id);
                                    setVidname(file.videoTitle);
                                    setViddesc(file.videoDescription);
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="Delete video">
                                <img
                                  src={del}
                                  alt="edit"
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    setOpendia(true);
                                    setDialog(true);
                                    setDdiaid(file.id);
                                  }}
                                />
                              </Tooltip>
                              <Dropzone
                                accept={{ "text/html": [".pdf", ".docx"] }}
                                useFsAccessApi={false}
                              >
                                {({
                                  getRootProps,
                                  getInputProps,
                                  acceptedFiles,
                                  open,
                                }) => (
                                  <Box>
                                    <input
                                      {...getInputProps()}
                                      onChange={(event) => {
                                        setFileUpload(event.target.files[0]);
                                        modules[chooseindex].videosData[
                                          videoindex
                                        ].extraFiles.push({
                                          fileName: event.target.files[0].name,
                                          fileSize: event.target.files[0].size,
                                        });
                                        setModules([...modules]);
                                        acceptedFiles.push(
                                          event.target.files[0]
                                        );
                                        setresoLoading(true);
                                        setresoLoaderindex(
                                          modules[chooseindex].videosData[
                                            videoindex
                                          ].extraFiles.length - 1
                                        );
                                      }}
                                    />
                                    <Tooltip title="Add resources">
                                      <img
                                        src={files}
                                        alt="edit"
                                        style={{
                                          width: "32px",
                                          height: "32px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          open();
                                          setAddresoid(file.id);
                                        }}
                                      />
                                    </Tooltip>
                                  </Box>
                                )}
                              </Dropzone>
                            </Stack>
                          )}
                        </Box>
                      </Stack>
                      {dialog && ddiaid === file.id && (
                        <Dialogue
                          opendia={opendia}
                          setOpendia={setOpendia}
                          title={"Delete the video?"}
                          content={"Are you sure you want to delete the video?"}
                          handleChange={handledelvid}
                          i={chooseindex}
                          id={index}
                        />
                      )}
                      {editvid && editvidid === file.id && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ width: "100%" }}
                          >
                            <TextField
                              size="small"
                              value={vidname}
                              onChange={(e) => {
                                setVidname(e.target.value);
                              }}
                              sx={{ width: "100%" }}
                            ></TextField>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              height: "32px",
                              marginBottom: "10px",
                              width: "100%",
                            }}
                          >
                            <TextField
                              label="Add description"
                              value={viddesc}
                              size="large"
                              multiline
                              rows={1.1}
                              onChange={(e) => {
                                setViddesc(e.target.value);
                              }}
                              sx={{ width: "100%" }}
                            ></TextField>
                          </Stack>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "5px",
                              marginTop: "10px",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="outlined"
                              sx={{
                                height: "38px",
                                textTransform: "capitalize",
                                padding: "px",
                              }}
                              onClick={() => {
                                setEditvid(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                height: "38px",
                                textTransform: "capitalize",
                                p: 2,
                                backgroundColor: "#698AFF",
                                fontSize: "12px",
                              }}
                              onClick={() => {
                                handleviddescupdate(index);
                                handlevidupdate(index);
                              }}
                            >
                              Update
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ color: "#292929" }}>
                Resources
              </Typography>
              <Typography sx={{ color: "#A0A0A0", fontSize: "12px" }}>
                Files should be in Pdf,Docs
              </Typography>
              <Typography sx={{ color: "#505050" }}>
                {chooseresoname}
              </Typography>
            </Box>
            <Dropzonereso
              modules={modules}
              addresoid={chooseindex}
              videoindex={videoindex}
              dialog={dialog}
              resoloading={resoloading}
              loaderindex={resoloaderindex}
              setresoLoading={setresoLoading}
            />
          </Box>
        </Box>
        <Stack direction="column" spacing={1.5}>
          <Paper
            sx={{
              height: "500px",
              width: "327px",
              overflow: "scroll",
              boxShadow: "none",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              background: " #FAFAFA",
            }}
            onClick={() => setTogglemenu(false)}
          >
            <Box p={2} sx={{ display: "flex", flexDirection: "column" }}>
              <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" gutterBottom>
                  {userdata?.title}
                </Typography>
                <Box>
                  <Tooltip title="Edit Course Details">
                    <IconButton>
                      <EditIcon
                        onClick={() => {
                          navigate(`/course-update/${id}`);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add new section">
                    <IconButton>
                      <AddIcon
                        onClick={() => {
                          setAddmodule(!addmodule);
                          setModule(false);
                          setIndex(index + 1);
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              {modules.map((value, i) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    backgroundColor:
                      chooseid === value.id && choose ? "#F5F5F5" : "",
                    padding: "12px",
                    borderRadius: "8px",
                  }}
                  key={value.id}
                  onClick={() => {
                    setChooseindex(i);
                    setChoosename(value.sectionTitle);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      height: "32px",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setChoose(true);
                      setChooseid(value.id);
                      setModule(false);
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#A0A0A0",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Section {i + 1}:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        width: "192px",
                        cursor: "pointer",
                      }}
                    >
                      {value.sectionTitle}
                    </Typography>
                  </Box>
                  {module && editid === value.id && (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        width: "270px",
                        height: "32px",
                        marginBottom: "10px",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        label="Edit"
                        value={title}
                        size="small"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      ></TextField>
                      <Button
                        variant="contained"
                        sx={{
                          height: "38px",
                          textTransform: "capitalize",
                          padding: "px",
                          backgroundColor: "#698AFF",
                        }}
                        onClick={() => {
                          handleupdate(i);
                        }}
                      >
                        Update
                      </Button>
                      <Box
                        sx={{
                          border: "1px solid #698AFF ",
                          borderRadius: "4px",
                          width: "26px",
                          height: "26px",
                        }}
                      >
                        <ClearIcon
                          color="error"
                          onClick={() => {
                            setModule(false);
                            setAddmodule(false);
                            setEditvid(false);
                          }}
                          sx={{ cursor: "pointer", color: "#698AFF" }}
                        />
                      </Box>
                    </Stack>
                  )}

                  {choose && chooseid === value.id && (
                    <Stack direction="row" spacing={0.5}>
                      <Dropzonevideo
                        accept={accept}
                        setModules={setModules}
                        setProgress={setProgress}
                        index={index}
                        id={i}
                        modules={modules}
                        secid={chooseid}
                        setLoading={setLoading}
                        setLoaderindex={setLoaderindex}
                      />
                      <Button
                        variant="outlined"
                        type="button"
                        sx={{ height: "38px", textTransform: "capitalize" }}
                        onClick={() => {
                          handlemod(value.id);
                          setTitle(value.sectionTitle);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        type="button"
                        sx={{ height: "38px", textTransform: "capitalize" }}
                        onClick={() => {
                          setOpendia(true);
                          setDialog(true);
                          setDiaid(value.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  )}
                  {dialog && diaid === value.id && (
                    <Dialogue
                      opendia={opendia}
                      setOpendia={setOpendia}
                      title={"Delete the section?"}
                      content={"Are you sure you want to delete the section?"}
                      handleChange={handleDelete}
                      i={i}
                    />
                  )}
                </Box>
              ))}

              {addmodule && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    width: "270px",
                    height: "32px",
                    marginBottom: "10px",
                    alignItems: "center",
                    paddingLeft: "12px",
                  }}
                >
                  <TextField
                    label="Add your module..."
                    size="small"
                    onChange={(e) => {
                      setModtitle(e.target.value);
                    }}
                  ></TextField>
                  <Button
                    variant="contained"
                    sx={{
                      height: "38px",
                      textTransform: "capitalize",
                      padding: "px",
                      backgroundColor: "#698AFF",
                    }}
                    onClick={createsec}
                  >
                    Add
                  </Button>
                  <Box
                    sx={{
                      border: "2px solid #698AFF ",
                      borderRadius: "4px",
                      width: "26px",
                      height: "26px",
                    }}
                  >
                    <ClearIcon
                      color="error"
                      onClick={() => {
                        setModule(false);
                        setAddmodule(false);
                        setEditvid(false);
                      }}
                      sx={{ cursor: "pointer", color: "#698AFF" }}
                    />
                  </Box>
                </Stack>
              )}
            </Box>
          </Paper>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => {
              navigate(`/coursevideos/${id}`);
            }}
          >
            <Button variant="contained" sx={{ width: "327px" }}>
              Go To Course
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Courseupload;
