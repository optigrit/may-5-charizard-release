import React from "react";
import { Box, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";
import { manipulateuserdata } from "../../Redux/UserData/User-Action";
import { useDispatch } from "react-redux";
import { SET_ALERT_DATA } from "../../Redux/UserData/User-Constants";

const Dropzonevideo = ({
  setModules,
  modules,
  id,
  secid,
  setLoading,
  setLoaderindex,
}) => {
  const [Id, setId] = useState();
  const [duration, setDuration] = useState(0);

  const {
    getRootProps: getRootvideoProps,
    getInputProps: getInputvideoProps,
    open,
    acceptedFiles,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    useFsAccessApi: false,
    accept: {
      "text/html": [".mp4"],
    },
  });

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

  const Token = localStorage.getItem("Token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080",
      Authorization: `bearer ${Token}`,
    },
  };

  const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader.result);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });

  const uploadFile = async (video, name) => {
    let filename = `videos/${name + v4()}`;

    if (video === null) {
      return null;
    }
    const fileRef = ref(storage, filename);
    await uploadBytes(fileRef, video);
    setLoading(false);
    return filename;
  };
  const saveVideoData = async (name, fileName, videoDuration) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}video/${secid}`,
        {
          videoTitle: name,
          videoUrl: fileName,
          videoLength: videoDuration,
        },
        config
      );
      modules[id].videosData[modules[id].videosData.length - 1].id = data[0].id;
      modules[id].videosData[modules[id].videosData.length - 1].extraFiles = [];
      modules[id].videosData[modules[id].videosData.length - 1].sectionId =
        data[0].sectionId;
      modules[id].videosData[modules[id].videosData.length - 1].videoUrl =
        data[0].videoUrl;
      modules[id].videosData[modules[id].videosData.length - 1].videoLength =
        data[0].videoLength;
      handlealert("Video uploaded!", "success");
    } catch (err) {
      handlealert("Error uploading video, please upload again!", "error");
    }
  };

  const videoUploadHandler = async (e) => {
    const video = e.target.files[0];
    const { name } = e.target.files[0];
    modules[id].videosData.push({ videoTitle: name });
    setModules([...modules]);
    acceptedFiles.push(e.target.files);
    setLoading(true);
    setLoaderindex(modules[id].videosData.length - 1);
    const fileName = await uploadFile(video, name);
    const videoDuration = await getVideoDuration(video);
    await saveVideoData(name, fileName, Math.round(videoDuration));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Box
        {...getRootvideoProps()}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input {...getInputvideoProps()} onChange={videoUploadHandler} />
        <Button
          variant="contained"
          type="button"
          sx={{
            backgroundColor: "#698AFF",
            height: "38px",
            width: "140px",
            textTransform: "capitalize",
            padding: "8px 12px 8px 12px",
          }}
          onClick={() => {
            open();
            setId(modules[id].id);
          }}
        >
          Choose Files
        </Button>
      </Box>
    </Box>
  );
};

export default Dropzonevideo;
